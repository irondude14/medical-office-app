class CreateStaffMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :staff_members do |t|
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :position
      t.string :specialization
      t.string :phone

      t.timestamps
    end
  end
end
