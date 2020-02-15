class StocksController < ApplicationController
  def buy
    res = HTTP.get("https://cloud.iexapis.com/stable/stock/aapl/quote?token=#{ENV['IEX_KEY']}").to_s
    render json: res
  end
end