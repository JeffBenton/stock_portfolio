require 'json'

class UsersController < ApplicationController
  def signin
    user = User.find_by(email: params[:email])
    if user.authenticate(params[:password])
      user.regenerate_auth_token
      render json: { id: user.id, auth_token: user.auth_token }
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
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    render json: { name: user[:name], balance: user[:balance], id: user[:id] }
  end
end