# ------------------------------------------------------------------------------
# ~/Gemfile (runtime)
# Provides package information to bundle all Ruby gem needed
# for Jekyll and J1 template (managed by Ruby Gem Bundler)
#
# Product/Info:
# https://jekyll.one
#
# Copyright (C) 2020 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
# ------------------------------------------------------------------------------
#
#  To install all gem needed for Jekyll and J1 Template
#
#  bundle install
#
#  Note:  If all packages needed are installed, a list of all gem
#         and dependencies installed for the bundle can created
#         by running:
#
#         bundle list
#
# ------------------------------------------------------------------------------
#
#  If you see warnings like:
#
#   WARN: Unresolved specs during Gem::Specification.reset
#         cleanup your bundle by running:
#
#         gem cleanup
#
# ------------------------------------------------------------------------------
source "https://rubygems.org"
ruby RUBY_VERSION

# ------------------------------------------------------------------------------
# Jekyll
# NOTE: J1 Template is using Jekyll v3.8 and above
#

# Latest stable Jekyll version
#
gem 'jekyll', '~> 4.0'

# Theme Rubies, default: J1 Template
#
gem 'j1-template', '~> 2020.0.1'

# ------------------------------------------------------------------------------
# PRODUCTION: Gem needed for the Jekyll and J1 prod environment
#

# ------------------------------------------------------------------------------
# Code Highlighter Rouge
#
gem 'rouge', '~> 3.3'

# ------------------------------------------------------------------------------
# XML|HTML processing
#
gem 'builder', '~> 3.2'
gem 'nokogiri', '>= 1.10.3'
gem 'nokogiri-pretty', '>= 0.1.0'
gem 'htmlbeautifier', '>= 1.2.1'

# ------------------------------------------------------------------------------
# Additional Gem for Asciidoctor (template|plugin support)
#
# gem 'slim', '~> 3.0.7'
# gem 'thread_safe', '~> 0.3.5'
gem 'middleman-core', '~> 4.2', '>= 4.2.1'

# ------------------------------------------------------------------------------
# Timezone support
#
gem 'tzinfo', '>= 1.2.2'

# ------------------------------------------------------------------------------
# Platform specific Gem
#

#   Windows does not include zoneinfo files, so bundle the
#   tzinfo-data gem
#
gem "tzinfo-data"                                                               # if Gem.win_platform?

#  Windows Directory Monitor (WDM) monitor directories
#  for changes
#
gem 'wdm', '>= 0.1.1'                                                           # if Gem.win_platform?

# ------------------------------------------------------------------------------
# Jekyll Plugins
# If any (additional) plugins are used, they goes here:
#
group :jekyll_plugins do
  gem 'asciidoctor', '= 1.5.8'
# gem 'asciidoctor-pdf', '>= 1.5.0.alpha.16'
  gem 'asciidoctor-rouge', '>= 0.3'
  gem 'jekyll-asciidoc', '>= 2.1.0'
# gem 'jekyll-algolia', '~> 1.0'
# gem 'jekyll-feed', ">= 0.9"
# gem 'jekyll-gist', '>= 1.5.0'
# gem 'jekyll-sitemap', '>= 1.2.0'
# gem 'jekyll-redirect-from', '>= 0.13.0'
  gem 'j1-paginator', '>= 2019.1.0'
  gem 'jekyll-sass-converter', '>= 1.5.1'
end

# ------------------------------------------------------------------------------
# Additional Gem for Docker support
#
# gem 'parallel', '~> 1.15'
# gem 'i18n', '0.9.5'

# ------------------------------------------------------------------------------
# Debugger specific RubyGems
#
# gem 'debase', '0.2.3'
# gem 'ruby-debug-ide', '0.7.0.beta7'

# ------------------------------------------------------------------------------
# Web Application specific RubyGems
#

# ------------------------------------------------------------------------------
# Define your Ruby version if the J1 web is used as an container-based
# web application, e.g. on Docker or a Heroku Dyno, to define and use
# of identical Ruby runtime environments.
#
# ruby '2.4.5'

# ------------------------------------------------------------------------------
# Enable the `rake` Gem if needed. For container-based apps, Rake can
# be used as a pre-processor engine running # tasks defined by a
# Rakefile prior running the app|web.
#
# gem 'rake', '~> 12.0'

# html-proofer. Automate the process of checking links on your site
#
#   bundle exec htmlproofer \
#     --allow_missing_href \
#     --allow_hash_href \
#     --assume_extension \
#     --directory_index_file \
#     --directory_index_file \
#     --empty_alt_ignore ./_site/index.html &> out.txt
#
# gem 'html-proofer', '~> 3.10'

# ------------------------------------------------------------------------------
# Define the build environment and the web server for J1 sites that
# runs as an web application. To improve the production (run-time)
# performance for the web, the RubyGems e.g Puma or Passenger can be
# used to replace the internal server WEBrick used by Jekyll for
# default.
# The web server Puma, a multi-threaded native Ruy-based web server
# can be used on ALL platforms. Passenger integrates the web server
# NginX but supported for Linux and Unix platforms only.
# For container-based apps, Rake can be used as a pre-processor engine
# running # tasks defined by a Rakefile prior running the app|web.
#
# gem 'passenger', '>= 5.3'
gem "puma", '>= 4.3.1'

# ------------------------------------------------------------------------------
# If J1 is transformed into a (Rack and Sinatra based) Web
# application, the site can be secured using user authentication
# for accessing private pages. J1 is using the Omniauth stack for
# authentication. For default, the Omniauth (authentication) strategies
# for Github, Twitter, Facebook and Patreon are implemented.
#
# gem 'rack', '>= 2.0.8'
# gem 'rack-protection', '~> 2.0'
# gem 'rack-ssl-enforcer', '~> 0.2'
# gem 'rest-client', '~> 2.0'

# gem 'omniauth', '>= 1.3.0'
# gem 'omniauth-oauth2', '~> 1.4'

# gem 'sinatra', '~> 2.0'
# gem 'sinatra-cross_origin', '~> 0.3.1'

# gem 'warden', '~> 1.2'

# ------------------------------------------------------------------------------
# Gem needed for J1 logger based on log4r (middleware)
#
gem 'log4r', '~> 1.1.10'
gem 'uuid', '~> 2.3', '>= 2.3.8'
gem 'date', '~> 2.0'

# ------------------------------------------------------------------------------
# DEVELOPMENT: Gem needed for the Jekyll and J1 dev environment
#

# For the build (npm|yarn), J1 Template is using scss_lint
# for linting the SCSS (CSS) components:
#
gem 'scss_lint', '~> 0.56.0'
gem 'sass', '~> 3.5.0'
gem 'bump', '~> 0.5.4'

# ------------------------------------------------------------------------------
# END
