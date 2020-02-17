require 'json'

class StocksController < ApplicationController

  # Endpoint for buying stocks
  # Checks for valid inputs and for adequate balance before completing transaction
  # returns updated balance on success
  def buy
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    if user
      begin
        Integer(params[:quantity])
      rescue ArgumentError
        render json: { success: false, error: "Quantity must be a positive integer"}
        return
      end

      res = HTTP.get("https://cloud.iexapis.com/stable/stock/#{params["ticker"]}/quote?token=#{ENV['IEX_KEY']}").to_s
      if res === "Unknown symbol" || res === "Not Found"
        render json: { success: false, error: res}
        return
      end
      data = JSON.parse(res)

      if user[:balance] < data["latestPrice"] * params["quantity"].to_i
        render json: { success: false, error: "Insufficient balance" }
      else
        Stock.create(name: data["companyName"], ticker: data["symbol"], price: data["latestPrice"], quantity: params["quantity"], user_id: user[:id])
        user[:balance] -= (data["latestPrice"] * params[:quantity].to_i)
        user.save

        render json: { success: true, newBalance: user[:balance] }
      end
    else
      render json: { success: false }
    end

  end

  # Endpoint for fetching transactions associated with a specific user
  def transactions
    user = authenticate(params[:user_id], request.headers["HTTP_AUTH_TOKEN"])
    if user
      transactions = Stock.where(user_id: user.id).order("created_at DESC")
      render json: { success: true, transactions: transactions }
    else
      render json: { success: false }
    end
  end

  # Endpoint for fetching stocks associated with a specific user
  def get
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    if user
      stocks = consolidateStocks(user[:id])
      render json: { success: true, stocks: stocks}
    else
      render json: { success: false }
    end

  end

  private

  # Helper method for fetching stocks that combines purchases of the same stock
  # into a single record
  def consolidateStocks(userId)
    s = {}
    Stock.where(user_id: userId).each do |stock|
      if s[stock[:ticker]]
        s[stock[:ticker]][:quantity] += stock[:quantity]
        s[stock[:ticker]][:value] += stock[:quantity] * s[stock[:ticker]][:price]
      else
        stockInfo = JSON.parse(HTTP.get("https://cloud.iexapis.com/stable/stock/#{stock[:ticker]}/quote?token=#{ENV['IEX_KEY']}").to_s)
        s[stock[:ticker]] = {
            ticker: stock[:ticker],
            quantity: stock[:quantity],
            price: stockInfo["latestPrice"],
            value: stock[:quantity] * stockInfo["latestPrice"],
            open: stockInfo["open"]
        }
      end
    end
    s
  end
end