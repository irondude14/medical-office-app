class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :email, :phone, :specialization

  has_many :appointments
  has_many :patients, through: :appointments
  has_many :test_results, through: :patients
end
