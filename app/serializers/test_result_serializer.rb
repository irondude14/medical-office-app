class TestResultSerializer < ActiveModel::Serializer
  # attributes :id

  belongs_to :patient
end
