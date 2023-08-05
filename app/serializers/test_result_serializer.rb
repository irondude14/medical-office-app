class TestResultSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :test_name, :result

  belongs_to :patient
end
