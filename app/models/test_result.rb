class TestResult < ApplicationRecord
  validates :test_name, presence: true
  validates :result, presence: true

  belongs_to :patient
end
