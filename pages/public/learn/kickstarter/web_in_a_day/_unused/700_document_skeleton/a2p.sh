#!/usr/bin/env bash

#  ---------------------------------------------------------------------------
#    Product/Info:
#    http://jekyll-one
#
#    Copyright (C) 2018 Juergen Adams
#    J1 is licensed under the MIT License
#  ---------------------------------------------------------------------------

# ENVIRONMENT
# set BASE_PATH=_absolute_path_jekyll_project
# ----------------------------------------------------------------------------
BASE_PATH=

# VARIABLES
# ----------------------------------------------------------------------------

PDF_STYLES_DIR=$BASE_PATH/_data/asciidoc2pdf
PDF_FONTS_DIR=$BASE_PATH/assets/themes/j1/core/fonts/roboto/fonts
PLUGINS_DIR=$BASE_PATH/_plugins/asciidoctor-extensions
PLUGIN_TWITTER_EMOJI=$PLUGINS_DIR/twitter-emoji-inline.rb
PLUGIN_LOREM_INLINE=$PLUGINS_DIR/lo#-inline.rb
MASTER_DOCUMENT=./document_title.a2p


# MAIN
# ----------------------------------------------------------------------------

# asciidoctor-pdf -a pdf-stylesdir=$PDF_STYLES_DIR -a pdf-fontsdir=$PDF_FONTS_DIR -r $PLUGIN_LOREM_INLINE %1

asciidoctor-pdf -a pdf-stylesdir=$PDF_STYLES_DIR -a pdf-fontsdir=$PDF_FONTS_DIR -r $PLUGIN_LOREM_INLINE $MASTER_DOCUMENT
