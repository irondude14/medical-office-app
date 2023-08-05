class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :user_id, :reason, :date_time

  belongs_to :user
  belongs_to :patient
end
