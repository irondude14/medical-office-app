class Patient < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :insurance_name, presence: true
  validates :address, presence: true
  validates :phone,
            presence: true,
            format: {
              with: /\A\+?\d{10,11}\z/,
              message: 'is invalid',
            }
end
