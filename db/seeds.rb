# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Icon.create(name: 'ArgoCD', low_x: 0.46, high_x: 0.54, low_y: 0.74, high_y: 0.91, found: false)
Icon.create(name: 'OpenFeign', low_x: 0.71, high_x: 0.81, low_y: 0.34, high_y: 0.50, found: false)
Icon.create(name: 'ReadyAPI', low_x: 0.27, high_x: 0.32, low_y: 0.62, high_y: 0.69, found: false)
Icon.create(name: 'VSCode', low_x: 0.10, high_x: 0.16, low_y: 0.45, high_y: 0.53, found: false)
