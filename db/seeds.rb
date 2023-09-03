# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding 🌱...'

User.create(
  name: 'Vlad Kadyrov',
  email: 'vkadyrov@gmail.com',
  phone: '+17184136666',
  password: '123',
  type: 'Admin',
  specialization: 'none',
)

User.create(
  name: 'Andrew Yang',
  email: 'ayang@gmail.com',
  phone: '+19174208787',
  password: '123',
  type: 'Doctor',
  specialization: 'physician',
)

Patient.create(
  email: 'edubicki@gmail.com',
  name: 'Edison Dubicki',
  address: '2 1st St, Elizabeth, NJ 07206',
  phone: '+19084335050',
  insurance: 'fidelis',
)

Appointment.create(
  user_id: 2,
  patient_id: 1,
  date_time: '2023-08-25 11:30',
  reason: 'pain in the abdomen',
)

TestResult.create(
  patient_id: 1,
  test_name: 'abdominal examination',
  result: 'pain the lower right side of the abdomen',
)

puts 'Done ✅'
