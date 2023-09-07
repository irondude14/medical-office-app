class User < ApplicationRecord
  has_secure_password

  enum role: %i[admin doctor]

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :type, presence: true
  validates :phone,
            presence: true,
            format: {
              with:
                /\A(\+\d{10,11}|(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}))\z/,
              message: 'is invalid',
            }

  has_many :appointments, dependent: :destroy
  has_many :patients, through: :appointments
end
