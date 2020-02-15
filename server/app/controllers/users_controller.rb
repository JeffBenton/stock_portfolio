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
    render json: { name: user[:name], stocks: user[:stocks], balance: user[:balance], id: user[:id]}
  end
end