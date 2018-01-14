class Plan < ActiveRecord::Base
  has_many :users  
    add_column :users, :plan_id, :integer
end