class AddPriceColumnToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :price, :float
  end
end
