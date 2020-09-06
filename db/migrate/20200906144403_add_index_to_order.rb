class AddIndexToOrder < ActiveRecord::Migration[6.0]
  def change
    add_index :orders, :date
  end
end
