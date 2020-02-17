require 'json'

class StocksController < ApplicationController
  def buy
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    res = HTTP.get("https://cloud.iexapis.com/stable/stock/#{params["ticker"]}/quote?token=#{ENV['IEX_KEY']}").to_s
    data = JSON.parse(res)
    Stock.create(name: data["companyName"], ticker: data["symbol"], price: data["latestPrice"], quantity: params["quantity"], user_id: user[:id])
    render json: { symbol: data["symbol"], open: data["open"], latestPrice: data["latestPrice"]}
  end

  def transactions
    user = authenticate(params[:user_id], request.headers["HTTP_AUTH_TOKEN"])
    transactions = Stock.where(user_id: user.id).order("created_at DESC")
    render json: transactions
  end

  def get
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    stocks = consolidateStocks(user[:id])
    render json: { stocks: stocks}
  end

  private

  def consolidateStocks(userId)
    s = {}
    Stock.where(user_id: userId).collect do |stock|
      if s[stock[:ticker]]
        s[stock[:ticker]][:quantity] += stock[:quantity]
        s[stock[:ticker]][:value] += stock[:quantity] * s[stock[:ticker]][:price]
      else
        stockInfo = JSON.parse(HTTP.get("https://cloud.iexapis.com/stable/stock/#{stock[:ticker]}/quote?token=#{ENV['IEX_KEY']}").to_s)
        s[stock[:ticker]] = {
            ticker: stock[:ticker],
            quantity: stock[:quantity],
            price: stockInfo["latestPrice"],
            value: stock[:quantity] * stockInfo["latestPrice"]
        }
      end
    end
    s
  end
end