# ------------------------------------------------------------------------------
# ~/_plugins/asciidoctor-extensions/lorem-block.rb
# Asciidoctor extension for J1 Template
#
# Product/Info:
# https://jekyll.one
#
# Copyright (C) 2020 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
#
# ------------------------------------------------------------------------------
# An extension that implements several type of (lorem) blind text
#
# Usage
#
#   lorem::type[]
#   lorem::type[size]
#
# ------------------------------------------------------------------------------
require 'middleman-core'
require 'middleman-core/extensions/lorem'
require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'

include Asciidoctor

Asciidoctor::Extensions.register do

  class LoremInlineMacro < Extensions::InlineMacroProcessor
    use_dsl
    named :lorem
    name_positional_attributes 'arg'

    def is_numeric(input)
      return true if input =~ /\A\d+\Z/
      false if Float(input) rescue false
    end

    def process parent, target, attributes
      lorem = Middleman::Extensions::Lorem::LoremObject
      method = target.to_sym
      if lorem.respond_to? method
        if (attributes.has_key? 'arg')
          if is_numeric(attributes['arg'])
            %w(words sentences).include?(target) ? content = lorem.send(method, attributes['arg'].to_i.abs) : nil
          else
            %w(word date image).include?(target) ? content = lorem.send(method, attributes['arg']) : nil
          end
          %w(sentences).include?(target) ? content.concat(".") : nil
          %(#{content})
        else
          %w(word sentence date name first_name last_name email).include?(target) ? content = lorem.send(method) : nil
          %w(sentence).include?(target) ? content.concat(".") : nil
          %(#{content})
        end
      else
        warn 'Unknown target for lorem block'
        nil
      end
    end
  end

  inline_macro LoremInlineMacro
end
