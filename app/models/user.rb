class User < ApplicationRecord
  has_many :stocks
  has_secure_password
  has_secure_token :auth_token

  validates :name, presence: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP}
  validates :password, presence: true, on: :create
end
