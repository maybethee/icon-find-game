class CreateHighScores < ActiveRecord::Migration[7.1]
  def change
    create_table :high_scores do |t|
      t.string :name
      t.float :score
      t.datetime :date

      t.timestamps
    end
  end
end
