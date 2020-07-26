# ------------------------------------------------------------------------------
# ~/_plugins/asciidoctor-extensions/fas-icon-inline.rb
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
require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
include Asciidoctor

Asciidoctor::Extensions.register do
  class FabIconInlineMacro < Extensions::InlineMacroProcessor
    use_dsl
    named :fab
    name_positional_attributes 'size', 'modifier'
    default_attrs 'size' => '1x', 'modifier' => ''

    def process parent, target, attributes
      doc = parent.document
      size_class = (size = attributes['size']) ? %(fa-#{size}) : nil
      modifier_class = (modifier = attributes['modifier']) ? %(#{modifier}) : nil
      icon_name = target.tr '_', '-'
      %(<i class="fab #{size_class} #{modifier} fa-#{icon_name}"></i>)
    end
  end
  inline_macro FabIconInlineMacro
end
