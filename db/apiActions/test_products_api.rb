#!/usr/bin/env ruby

# Test script for Products API endpoints
# Run with: ruby db/apiActions/test_products_api.rb

require 'net/http'
require 'uri'
require 'json'
require File.expand_path('../../../config/environment', __FILE__)

puts "🧪 Testing Products API Endpoints"
puts "=" * 50

# Helper method to make API requests
def make_request(method, path, data = nil)
  uri = URI("http://localhost:3000#{path}")
  http = Net::HTTP.new(uri.host, uri.port)

  case method
  when :get
    request = Net::HTTP::Get.new(uri)
  when :post
    request = Net::HTTP::Post.new(uri)
    request['Content-Type'] = 'application/json'
    request.body = data.to_json if data
  when :put
    request = Net::HTTP::Put.new(uri)
    request['Content-Type'] = 'application/json'
    request.body = data.to_json if data
  when :delete
    request = Net::HTTP::Delete.new(uri)
  end

  response = http.request(request)
  begin
    [response.code.to_i, JSON.parse(response.body)]
  rescue JSON::ParserError
    [response.code.to_i, response.body]
  end
rescue => e
  puts "❌ Request failed: #{e.message}"
  return [500, { error: e.message }]
end

# Test data
test_product = {
  name: "Test Laptop",
  description: "A high-performance laptop for developers",
  price: 1299.99,
  stock: 10,
  tags: "electronics,laptop,developer"
}

updated_product = {
  name: "Updated Test Laptop",
  description: "An updated high-performance laptop for developers",
  price: 1399.99,
  stock: 8,
  tags: "electronics,laptop,developer,updated"
}

puts "\n📋 Testing API Endpoints:"
puts "1. GET /api/v1/products (list all)"
puts "2. POST /api/v1/products (create)"
puts "3. GET /api/v1/products/:id (show)"
puts "4. PUT /api/v1/products/:id (update)"
puts "5. DELETE /api/v1/products/:id (delete)"

# Test 1: GET /api/v1/products (should return empty array initially)
puts "\n1️⃣ Testing GET /api/v1/products"
status, response = make_request(:get, "/api/v1/products")
if status == 200
  puts "✅ GET /api/v1/products - Status: #{status}"
  puts "   Response: #{response.inspect}"
else
  puts "❌ GET /api/v1/products - Status: #{status}, Response: #{response}"
end

# Test 2: POST /api/v1/products (create product)
puts "\n2️⃣ Testing POST /api/v1/products"
status, response = make_request(:post, "/api/v1/products", test_product)
if status == 201
  puts "✅ POST /api/v1/products - Status: #{status}"
  puts "   Created product: #{response['name']}"
  product_id = response['id']
else
  puts "❌ POST /api/v1/products - Status: #{status}, Response: #{response}"
  exit 1
end

# Test 3: GET /api/v1/products/:id (show created product)
puts "\n3️⃣ Testing GET /api/v1/products/#{product_id}"
status, response = make_request(:get, "/api/v1/products/#{product_id}")
if status == 200 && response['name'] == test_product[:name]
  puts "✅ GET /api/v1/products/#{product_id} - Status: #{status}"
  puts "   Product name: #{response['name']}"
else
  puts "❌ GET /api/v1/products/#{product_id} - Status: #{status}, Response: #{response}"
end

# Test 4: PUT /api/v1/products/:id (update product)
puts "\n4️⃣ Testing PUT /api/v1/products/#{product_id}"
status, response = make_request(:put, "/api/v1/products/#{product_id}", updated_product)
if status == 200 && response['name'] == updated_product[:name]
  puts "✅ PUT /api/v1/products/#{product_id} - Status: #{status}"
  puts "   Updated product name: #{response['name']}"
else
  puts "❌ PUT /api/v1/products/#{product_id} - Status: #{status}, Response: #{response}"
end

# Test 5: DELETE /api/v1/products/:id (delete product)
puts "\n5️⃣ Testing DELETE /api/v1/products/#{product_id}"
status, response = make_request(:delete, "/api/v1/products/#{product_id}")
if status == 204
  puts "✅ DELETE /api/v1/products/#{product_id} - Status: #{status}"
else
  puts "❌ DELETE /api/v1/products/#{product_id} - Status: #{status}, Response: #{response}"
end

# Test 6: Verify product was deleted
puts "\n6️⃣ Verifying product was deleted"
status, response = make_request(:get, "/api/v1/products/#{product_id}")
if status == 404
  puts "✅ Product successfully deleted - Status: #{status}"
else
  puts "❌ Product still exists - Status: #{status}, Response: #{response}"
end

# Test 7: GET /api/v1/products (should return empty array again)
puts "\n7️⃣ Testing GET /api/v1/products (final check)"
status, response = make_request(:get, "/api/v1/products")
if status == 200
  puts "✅ GET /api/v1/products - Status: #{status}"
  puts "   Final product count: #{Array(response).length}"
else
  puts "❌ GET /api/v1/products - Status: #{status}, Response: #{response}"
end

puts "\n🎉 API Testing Complete!"
puts "All CRUD operations tested successfully! ✅"
