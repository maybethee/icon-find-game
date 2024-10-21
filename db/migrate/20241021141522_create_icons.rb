class CreateIcons < ActiveRecord::Migration[7.1]
  def change
    create_table :icons do |t|
      t.string :name
      t.float :low_x
      t.float :high_x
      t.float :low_y
      t.float :high_y
      t.boolean :found

      t.timestamps
    end
  end
end
