class CreateTestResults < ActiveRecord::Migration[6.1]
  def change
    create_table :test_results do |t|
      t.integer :patient_id, null: false
      t.string :test_name
      t.string :result

      t.timestamps
    end
  end
end
