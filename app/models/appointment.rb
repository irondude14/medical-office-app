class Appointment < ApplicationRecord
  validates :date_time, presence: true
  validates :reason, presence: true

  belongs_to :user
  belongs_to :patient
end
