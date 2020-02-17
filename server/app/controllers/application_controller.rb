class ApplicationController < ActionController::API
  def authenticate(id, auth_token)
    User.find_by(id: id, auth_token: auth_token)
  end
end
