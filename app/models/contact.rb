class Contact < ActiveRecord::Base
   # Contact form vaildations 
   validates :name, presence: true
   validates :email, presence: true
   validates :comments, presence: true
end