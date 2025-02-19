steps to set up this react on rails project

set the postgres db in database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  username: "Your User Name"
  password: "Your Password"
  host: "if any or else localhost"
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

1. run bundle
2. run rails db:create
3. run rails db:migrate
4. run yarn install
5. run bin/dev
