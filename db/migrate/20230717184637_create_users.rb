class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, unique: true
      t.string :password_digest
      t.string :name
      t.string :type
      t.string :specialization
      t.string :phone

      t.timestamps
    end
  end
end
