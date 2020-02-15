class StocksController < ApplicationController
  def buy
    puts params
    render json: true
  end
end