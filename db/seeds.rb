# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Icon.create(name: 'ArgoCD', low_x: 0.45866666666666667, high_x: 0.5366666666666666, low_y: 0.7456749004059712,
            high_y: 0.9097446833331253, found: false)
Icon.create(name: 'OpenFeign', low_x: 0.7109090983072917, high_x: 0.8113333333333334, low_y: 0.3397619836989883,
            high_y: 0.5006356020236653, found: false)
Icon.create(name: 'ReadyAPI', low_x: 0.2753333333333333, high_x: 0.31933333333333336, low_y: 0.6220898569177924,
            high_y: 0.68920931356981, found: false)
Icon.create(name: 'VSCode', low_x: 0.10666666666666667, high_x: 0.16066666666666668, low_y: 0.4484315801832072,
            high_y: 0.5336626362492614, found: false)
