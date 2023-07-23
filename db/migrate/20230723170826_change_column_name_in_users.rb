class ChangeColumnNameInUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :position, :type
  end
end
