# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Seed initial products
products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    stock: 50,
    tags: "electronics,audio,wireless"
  },
  {
    name: "Smartphone Case",
    description: "Protective case for smartphones with anti-slip grip and card holder.",
    price: 24.99,
    stock: 100,
    tags: "accessories,protection,phone"
  },
  {
    name: "Coffee Maker",
    description: "12-cup programmable coffee maker with thermal carafe and auto-shutoff.",
    price: 89.99,
    stock: 25,
    tags: "kitchen,appliances,coffee"
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials, 6mm thick.",
    price: 39.99,
    stock: 75,
    tags: "fitness,sports,exercise"
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging port and multiple brightness levels.",
    price: 49.99,
    stock: 40,
    tags: "lighting,office,desk"
  }
]

products.each do |product_data|
  Product.find_or_create_by!(name: product_data[:name]) do |product|
    product.description = product_data[:description]
    product.price = product_data[:price]
    product.stock = product_data[:stock]
    product.tags = product_data[:tags]
  end
end

puts "Seeded #{products.size} products successfully!"
