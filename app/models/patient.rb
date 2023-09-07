class Patient < ApplicationRecord
  validates :name, presence: true
  validates :email, uniqueness: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :insurance, presence: true
  validates :address, presence: true
  validates :phone,
            presence: true,
            format: {
              with:
                /\A(\+\d{10,11}|(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}))\z/,
              message: 'is invalid',
            }

  has_many :test_results, dependent: :destroy
  has_many :appointments, dependent: :destroy
  has_many :users, through: :appointments
end
