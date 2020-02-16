require 'json'

class UsersController < ApplicationController
  def signin
    user = User.find_by(email: params[:email])
    if user.authenticate(params[:password])
      render json: { id: user.id }
    else
      render json: false
    end
  end

  def register
    user = User.new(name: params[:name], email: params[:email], password: params[:password])
    if user.valid?
      user.save
      render json: { id: user.id }
    else
      render json: false
    end
  end

  def get
    user = User.find_by(id: params[:id])
    stocks = consolidateStocks(user[:id])
    render json: { name: user[:name], stocks: stocks, balance: user[:balance], id: user[:id]}
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