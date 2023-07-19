class CreateShifts < ActiveRecord::Migration[6.1]
  def change
    create_table :shifts do |t|
      t.integer :staff_member_id, null: false
      t.string :day
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
