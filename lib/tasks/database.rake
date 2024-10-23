namespace :db do
  desc 'Terminate active connections and reset the database'
  task reset_with_terminate: :environment do
    ActiveRecord::Base.connection.execute <<-SQL
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '#{ActiveRecord::Base.connection.current_database}'
        AND pid <> pg_backend_pid();
    SQL

    Rake::Task['db:reset'].invoke
  end
end
