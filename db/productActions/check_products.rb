#!/usr/bin/env ruby

require './config/environment'

# Check if products table exists and show its structure
begin
  connection = ActiveRecord::Base.connection

  # Check if table exists
  if connection.table_exists?(:products)
    puts "✅ Products table exists!"

    # Get table structure
    columns = connection.columns(:products)
    puts "\n📋 Table Structure:"
    columns.each do |column|
      puts "  #{column.name}: #{column.type}#{column.null ? '' : ' (NOT NULL)'}" +
           "#{column.default ? " (default: #{column.default})" : ''}"
    end

    # Show current count
    count = Product.count
    puts "\n📊 Records count: #{count}"

  else
    puts "❌ Products table does not exist!"
  end

rescue => e
  puts "❌ Error: #{e.message}"
end
