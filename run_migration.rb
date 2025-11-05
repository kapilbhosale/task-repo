#!/usr/bin/env ruby

# Run Rails migrations properly
# Run with: ruby run_migration.rb

require './config/environment'

puts "🔄 Running Rails migrations..."

begin
  # Run all pending migrations
  ActiveRecord::Migration.verbose = true
  ActiveRecord::Migrator.migrate('db/migrate')

  puts "✅ All migrations completed successfully!"

rescue => e
  puts "❌ Migration failed: #{e.message}"
  exit 1
end
