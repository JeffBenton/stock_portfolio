class UsersController < ApplicationController
  def signin
    @user = User.find_by(email: params[:email])
    # @user.authenticate(params[:password])
    render status: 200, json: true
  end

  def register
    user = User.new(name: params[:name], email: params[:email], password: params[:password])
    if user.valid?
      user.save
      render status: 200, json: true
    else
      render status: 401, json: false
    end
  end
end