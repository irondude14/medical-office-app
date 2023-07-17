class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.datetime :created_at
      t.integer :patient_id
      t.integer :staff_member_id

      t.timestamps
    end
  end
end
