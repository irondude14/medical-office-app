class CreateDoctorsAvailability < ActiveRecord::Migration[6.1]
  def change
    create_table :doctors_availabilities do |t|
      t.integer :staff_member_id
      t.string :day
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
