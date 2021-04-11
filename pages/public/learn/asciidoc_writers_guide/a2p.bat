@echo off
rem  ---------------------------------------------------------------------------
rem    Product/Info:
rem    https://jekyll-one
rem
rem    Copyright (C) 2017, 2018 Juergen Adams
rem    J1 is licensed under the MIT License
rem  ---------------------------------------------------------------------------

rem asciidoctor -r ../../../../_plugins/asciidoctor-extensions/twitter-emoji-inline.rb -r asciidoctor-pdf -b pdf 000_flex_in_a_day.a2p


rem Set variables
rem ----------------------------------------------------------------------------

set PLUGINS_DIR=../../../../_plugins/asciidoctor-extensions
set PLUGIN_TWITTER_EMOJI=%PLUGINS_DIR%/twitter-emoji-inline.rb
set PLUGIN_LOREM_INLINE=%PLUGINS_DIR%/lorem-inline.rb

rem asciidoctor-pdf -r %PLUGINS_DIR%/twitter-emoji-inline.rb %1

rem MAIN
rem ----------------------------------------------------------------------------

rem asciidoctor-pdf -r %PLUGIN_LOREM_INLINE% .\asciidoc_writers_guide.a2p
rem asciidoctor-pdf -r %PLUGIN_LOREM_INLINE% %1

asciidoctor-pdf -r %PLUGIN_LOREM_INLINE% .\asciidoc_writers_guide.a2p
