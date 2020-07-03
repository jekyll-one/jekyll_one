# ------------------------------------------------------------------------------
# ~/_plugins/uglify.rb
# Liquid filter for J1 Template to uglify JS
#
# Product/Info:
# http://jekyll.one
#
# Copyright (C) 2020 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
# ------------------------------------------------------------------------------
# => Uglifier.compile(File.read(input))
# ------------------------------------------------------------------------------
#
#  NOTE:
#  CustomFilters cannot be used in SAFE mode (e.g not usable for
#  rendering pages with Jekyll on GitHub
#
#  USAGE:
#    {% capture cache_name %}
#
#      liquid code to generate HTML output goes here
#
#    {% endcapture %}
#    {{ cache_name | uglify }}
#
# ------------------------------------------------------------------------------
require 'uglifier'

module Jekyll
  module UglifyJS
    def uglify(input)
      site_config = @context.scopes[0]["site_config"]
      path = @context.registers[:page]["url"]
      Uglifier.compile(File.read("X:/j1/github/j1-template/packages/400_template_site/_site/assets/themes/j1/adapter/js/toccer.js"))
    end
  end
end

Liquid::Template.register_filter(Jekyll::UglifyJS)
