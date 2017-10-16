class Organization < ApplicationRecord
  has_many :services, dependent: :destroy

  validates :name, :address, presence: true
end
