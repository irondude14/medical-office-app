class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :type, :specialization, :phone

  has_many :appointments, dependent: :destroy
  has_many :patients, through: :appointments
end
