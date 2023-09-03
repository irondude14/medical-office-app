class CreateTestResults < ActiveRecord::Migration[6.1]
  def change
    create_table :test_results do |t|
      t.string :test_name
      t.string :result

      t.references :patient, null: false, foreign_key: true
      t.timestamps
    end
  end
end
