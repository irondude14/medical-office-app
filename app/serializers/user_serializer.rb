class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :type, :specialization, :phone

  has_many :appointments
  has_many :patients, through: :appointments
end
