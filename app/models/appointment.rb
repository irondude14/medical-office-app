class Appointment < ApplicationRecord
  validates :date_time, presence: true
  validates :reason, presence: true
  validate :date_time_in_the_past

  belongs_to :user
  belongs_to :patient

  def date_time_in_the_past
    if date_time.present? && date_time < DateTime.now
      errors.add(:date_time, "can't be in the past. Select a future date.")
    end
  end
end
