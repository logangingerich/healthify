source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'rack-cors'
gem 'oat'

group :development, :test do
  gem "rspec-rails"
  gem "pry-rails"
  gem 'foreman', '~> 0.82.0'
end

group :test do
  gem "shoulda-matchers", require: false
end
