class Product < ApplicationRecord
  # Validations
  validates :name, presence: true, uniqueness: { case_sensitive: false, message: "Product with this name already exists" }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :stock, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
