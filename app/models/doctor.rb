class Doctor < User
  has_many :test_results, through: :patients
end
