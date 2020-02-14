class UsersController < ApplicationController
  def signin
    @user = User.find_by(email: params[:email])
    # @user.authenticate(params[:password])
    render status: 200, json: true
  end

  def register
    puts params
    render status: 200, json: true
  end
end