require 'json'

class UsersController < ApplicationController

  # Handles sign in attempts
  # Generates and stores a new auth token
  def signin
    user = User.find_by(email: params[:email])
    if user and user.authenticate(params[:password])
      user.regenerate_auth_token
      render json: { success: true, id: user.id, auth_token: user.auth_token }
    else
      render json: { success: false, error: "Email or password is incorrect" }
    end
  end

  # Handles registration attempts
  # Validates user field requirements
  def register
    user = User.create(name: params[:name], email: params[:email], password: params[:password])
    if !user.errors.empty?
      render json: { success: false, errors: user.errors.messages }
    else
      render json: { success: true, id: user.id, auth_token: user.auth_token }
    end
  end

  # Handles fetching a specific user
  def get
    user = authenticate(params[:id], request.headers["HTTP_AUTH_TOKEN"])
    if user
      render json: { success: true, name: user[:name], balance: user[:balance], id: user[:id] }
    else
      render json: { success: false }
    end
  end
end