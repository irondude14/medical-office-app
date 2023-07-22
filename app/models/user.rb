class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :position, presence: true
  validates :specialization, presence: true
  validates :phone,
            presence: true,
            format: {
              with: /\A\+?\d{10,11}\z/,
              message: 'is invalid',
            }

  has_many :appointments
  has_many :patients, through: :appointments
end
