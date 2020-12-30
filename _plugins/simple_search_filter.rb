# ------------------------------------------------------------------------------
# ~/_plugins/simple_search_filter.rb
# Liquid filter's to be used with JekyllSimple Search
#
# Product/Info:
# http://jekyll.one
#
# Copyright (C) 2021 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
# ------------------------------------------------------------------------------

module Jekyll
  module CharFilter
    def remove_chars(input)
      input.gsub! '\\','&#92;'
      input.gsub! /\t/, '    '
      input.strip_control_and_extended_characters
    end
  end
end

Liquid::Template.register_filter(Jekyll::CharFilter)

class String
  def strip_control_and_extended_characters()
    chars.each_with_object("") do |char, str|
      str << char if char.ascii_only? and char.ord.between?(32,126)
    end
  end
end
