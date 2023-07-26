class AppointmentSerializer < ActiveModel::Serializer
  # attributes :id

  belongs_to :user
  belongs_to :patient
end
