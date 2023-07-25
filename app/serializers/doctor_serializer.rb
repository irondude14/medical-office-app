class DoctorSerializer < ActiveModel::Serializer
  # attributes :id, :name, :email
  has_many :appointments
  has_many :patients, through: :appointments
end
