class Appointment < ApplicationRecord
  validates :date_time, presence: true
  validates :reason, presence: true
end
