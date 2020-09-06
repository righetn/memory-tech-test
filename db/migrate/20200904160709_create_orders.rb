class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.datetime :date
      t.integer :order_id
      t.integer :customer_id
      t.string :country
      t.string :product_code
      t.text :product_description
      t.integer :quantity
      t.float :unit_price
    end
  end
end
