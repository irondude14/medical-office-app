class PatientSerializer < ActiveModel::Serializer
  # attributes :id

  has_many :appointments
  has_many :users, through: :appointments
  has_many :test_results
end
