class ApplicationController < ActionController::API
  def authenticate(id, auth_token)
    User.find_by(id: id, auth_token: auth_token)
  end

  def fallback_index_html
    render :file => 'public/index.html'
  end
end
