class UserSerializer < ActiveModel::Serializer
  # attributes :id

  has_many :appointments
  has_many :patients, through: :appointments
end
