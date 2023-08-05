class PatientSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :address, :phone, :insurance

  has_many :appointments
  has_many :users, through: :appointments
  has_many :test_results
end
