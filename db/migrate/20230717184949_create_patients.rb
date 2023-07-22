class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :email
      t.string :name
      t.string :address
      t.string :phone
      t.string :insurance_name

      t.timestamps
    end
  end
end
