@ECHO OFF
REM  ---------------------------------------------------------------------------
REM    Product/Info:
REM    http://jekyll-one
REM
REM    Copyright (C) 2018 Juergen Adams
REM    J1 is licensed under the MIT License
REM  ---------------------------------------------------------------------------

REM ENVIRONMENT
REM set BASE_PATH=_absolute_path_jekyll_project
REM ----------------------------------------------------------------------------
SET BASE_PATH=X:\j1\j1_devel_4\j1_mde_4_dev\work

REM VARIABLES
REM ----------------------------------------------------------------------------

SET PDF_STYLES_DIR=%BASE_PATH%\_data\asciidoc2pdf
SET PDF_FONTS_DIR=%BASE_PATH%\assets\themes\j1\core\fonts\roboto\fonts
SET PLUGINS_DIR=%BASE_PATH%\_plugins\asciidoctor-extensions
SET PLUGIN_TWITTER_EMOJI=%PLUGINS_DIR%\twitter-emoji-inline.rb
SET PLUGIN_LOREM_INLINE=%PLUGINS_DIR%\lorem-inline.rb
SET MASTER_DOCUMENT=.\document_title.a2p


REM MAIN
REM ----------------------------------------------------------------------------

REM asciidoctor-pdf -a pdf-stylesdir=%PDF_STYLES_DIR% -a pdf-fontsdir=%PDF_FONTS_DIR% -r %PLUGIN_LOREM_INLINE% %1

asciidoctor-pdf -a pdf-stylesdir=%PDF_STYLES_DIR% -a pdf-fontsdir=%PDF_FONTS_DIR% -r %PLUGIN_LOREM_INLINE% %MASTER_DOCUMENT%
