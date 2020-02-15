class User < ApplicationRecord
  has_many :stocks
  has_secure_password

  validates :name, presence: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP}
  validates :password, presence: true
end
