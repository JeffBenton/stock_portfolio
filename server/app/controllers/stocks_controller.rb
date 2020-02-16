require 'json'

class StocksController < ApplicationController
  def buy
    res = HTTP.get("https://cloud.iexapis.com/stable/stock/#{params["ticker"]}/quote?token=#{ENV['IEX_KEY']}").to_s
    data = JSON.parse(res)
    Stock.create(name: data["companyName"], ticker: data["symbol"], price: data["latestPrice"], quantity: params["quantity"], user_id: params["id"])
    render json: { symbol: data["symbol"], open: data["open"], latestPrice: data["latestPrice"]}
  end
end