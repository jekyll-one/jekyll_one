---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/themer.js
 # Liquid template to adapt theme functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ config | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment       = site.environment %}
{% assign template_version  = site.version %}
{% assign asset_path        = "/assets/themes/j1" %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign site_config       = site %}
{% assign template_config   = site.data.template_settings %}
{% assign blocks            = site.data.blocks %}
{% assign modules           = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign themer_defaults   = modules.defaults.themer.defaults %}
{% assign themer_settings   = modules.themer.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign themer_options    = themer_defaults | merge: themer_settings %}
{% assign default_theme     = template_config.bootstrap.default_theme %}
{% assign vendor_css        = "vendor" %}
{% assign theme_base        = "core/css" %}
{% assign theme_ext         = "css" %}

{% if environment == "development" or environment == "test" %}
  {% assign theme_ext       = "css" %}
{% else %}
  {% assign theme_ext       = "min.css" %}
{% endif %}


/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/themer.js
 # JS Adapter for J1 themer (BS Theme themer)
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/jguadagno/bootstrapThemethemer
 #
 # Copyright (C) 2020 Juergen Adams
 # Copyright (C) 2014 Joseph Guadagno
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # BS Theme themer is licensed under the MIT License.
 # For details, see https://github.com/jguadagno/bootstrapThemethemer/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 # NOTE:
 #  Setup of theme selectors (ThemeList|ThemeSelect) moved
 #  to j1_adapter_navigator.js
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

j1.adapter['themer'] = (function (j1, window) {

  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment            = '{{environment}}';
  var moduleOptions          = {};
  var user_state             = {};
  var cookie_names           = j1.getCookieNames();
  var cookie_user_state_name = cookie_names.user_state;
  var user_state_detected    = false;
  var id                     = 'default';
  var cssFile                = '{{themer_options.defaultCssFile}}';
  var interval_count         = 0;
  var max_count              = 4;
  var user_state_json;
  var user_state_cookie;
  var _this;
  var theme;
  var themeName;
  var themeCss;
  var themeCssHtml;
  var vendorCssHtml;
  var themeExtensionCss;
  var themeExtensionCssHtml;
  var logger;
  var logText;

  var default_theme_css           = environment === 'production' ? '/assets/themes/j1/core/css/uno.min.css' : '/assets/themes/j1/core/css/uno.css';
  var default_theme_extention_css = '{{themer_options.includeBootswatch}}';
  var default_theme_name          = 'Uno';
  var default_theme_author        = 'J1 Team';
  var default_theme_link          = 'https://jekyll.one/';

  // ---------------------------------------------------------------------------
  // helper functions
  // ---------------------------------------------------------------------------

  // See: https://stackoverflow.com/questions/16965515/how-to-get-a-style-attribute-from-a-css-class-by-javascript-jquery
  // Example: getStyleValueFromStyleSheet('bg-primary', 'background-color', 'vendor');
  function styleSheetLoaded(styleSheet) {
    // var styleSheet  = styleSheetName.toLowerCase() + '.css';
    var sheets      = document.styleSheets, stylesheet = sheets[(sheets.length - 1)];

    // find CSS file 'styleSheetName' in document
    for(var i in document.styleSheets) {
      if(sheets[i].href && sheets[i].href.indexOf(styleSheet) > -1) {
        return true;;
      }
    }
    return false;
  }

  {% comment %} Unused
  ------------------------------------------------------------------------------
  // NOTE: Does not work anymore because of CORS check violation
  // See: https://stackoverflow.com/questions/16965515/how-to-get-a-style-attribute-from-a-css-class-by-javascript-jquery
  // Example: getStyleValueFromStyleSheet('bg-primary', 'background-color', 'vendor');
  function getStyleValueFromStyleSheet(className, style, styleSheetName) {
    var sheets = document.styleSheets, stylesheet = sheets[(sheets.length - 1)];
    var style;

    // find CSS file 'styleSheetName' in document
    for(var i in document.styleSheets){
      if(sheets[i].href && sheets[i].href.indexOf(styleSheetName + ".css") > -1) {
        stylesheet = sheets[i];
        break;
      }
      if (typeof(stylesheet) === 'undefined') return null;
    }

    // find CSS style 'style' in styleSheetName
    for (var j=0, k=stylesheet.cssRules.length; j < k; j++) {
      var rule = stylesheet.cssRules[j];
      if (rule.selectorText && rule.selectorText.split(',').indexOf('.' +className) !== -1) {
        style = rule.style[style];
        return style;
      }
    }

    return null;
  }
  ------------------------------------------------------------------------------ {% endcomment %}


  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // initializer
    // -------------------------------------------------------------------------
    init: function () {
      // initialize state flag
      j1.adapter.themer.state = 'started';

      _this     = j1.adapter.themer;
      logger    = log4javascript.getLogger('j1.adapter.themer');

      logger.info('state: ' + _this.getState());

      // Detect|Set J1 UserState
      user_state_detected = j1.existsCookie(cookie_user_state_name);
      if (user_state_detected) {
        user_state            = j1.readCookie(cookie_user_state_name);
        themeName             = user_state.theme_name;
        themeCss              = user_state.theme_css;
        themeExtensionCss     = user_state.theme_extension_css;
      }
      if (themeCss) {
        themeCssHtml          = "<link rel='stylesheet' id='" + id + "' href='" + themeCss + "' type='text/css' />";
        themeExtensionCssHtml = "<link rel='stylesheet' id='" + id + "' href='" + themeExtensionCss + "' type='text/css' />";
      } else {
        themeName             = default_theme_name;
        themeCssHtml          = '<link rel="stylesheet" type="text/css" id="default" href="{{asset_path}}/{{theme_base}}/{{default_theme}}.{{theme_ext}}" />';
        vendorCssHtml         = '<link rel="stylesheet" type="text/css" id="default" href="{{asset_path}}/{{theme_base}}/{{vendor_css}}.{{theme_ext}}" />';
        $('head').append(vendorCssHtml);
      }
      $('head').append(themeCssHtml);

      // Append|Remove theme extentions
      // TODO: Make default theme name 'Uno' configurable
      if (themeName === 'Uno') {
        $('head link[href*="' +themeExtensionCss+ '"]').remove();
      } else {
        $('head').append(themeExtensionCssHtml);
      }

      {% if themer_options.enabled %}
        logger.info('themes detected as: enabled');
        logger.info('theme is being initialized: ' + themeName);

      $.when (
        $('#ThemeList').bootstrapThemeSwitcher.defaults = {
          debug:                    {{ themer_options.debug | json }},
          saveToCookie:             {{ themer_options.saveToCookie | json }},
          cssThemeLink:             {{ themer_options.cssThemeLink | json }},
          cookieThemeName:          {{ themer_options.cookieThemeName | json }},
          cookieDefaultThemeName:   {{ themer_options.cookieDefaultThemeName | json }},
          cookieThemeCss:           {{ themer_options.cookieThemeCss | json }},
          cookieThemeExtensionCss:  {{ themer_options.cookieThemeExtensionCss | json }},
          cookieExpiration:         {{ themer_options.cookieExpiration | json }},
          cookiePath:               {{ themer_options.cookiePath | json }},
          defaultCssFile:           {{ themer_options.defaultCssFile | json }},
          bootswatchApiUrl:         {{ themer_options.bootswatchApiUrl | json }},
          bootswatchApiVersion:     {{ themer_options.bootswatchApiVersion | json }},
          loadFromBootswatch:       {{ themer_options.loadFromBootswatch | json }},
          localFeed:                {{ themer_options.localFeed | json }},
          excludeBootswatch:        {{ themer_options.excludeBootswatch | json }},
          includeBootswatch:        {{ themer_options.includeBootswatch | json }},
          skipIncludeBootswatch:    {{ themer_options.skipIncludeBootswatch | json }}
        })
        .then (function() {
          if (themeName === 'Uno' || themeName === 'Bootstrap') {
            theme = environment === 'production'
              ? themeName.toLowerCase() + '.min.css'
              : themeName.toLowerCase() + '.css';
          } else {
            theme = 'bootstrap.css';  // fallback
          }
          logger.info('theme loaded: ' + themeName);
          logger.info('theme file: ' + theme);
          _this.setState('finished');
          logger.info('state: ' + _this.getState());
          logger.info('module initialized successfully');
          var dependencies_colors_loaded = setInterval (function() {
            if (typeof j1.colors !== 'undefined') {
              // set general|global theme colors
              _this.setCss();
              clearInterval(dependencies_colors_loaded);
            }
          }, 25); // END 'dependencies_colors_loaded'
        });
      {% else %}
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.info('module detected as: disabled');
        return true;
      {% endif %}

    }, // END init

    // -------------------------------------------------------------------------
    // setCss
    // Set dynamic styles
    // -------------------------------------------------------------------------
    setCss: function () {
      var bg_primary                      = j1.getStyleValue('bg-primary', 'background-color');

  //  var admonitionblock_note_color      = j1.getStyleValue('icon-note', 'color');
  //  var admonitionblock_tip_color       = j1.getStyleValue('icon-tip', 'color');
  //  var admonitionblock_important_color = j1.getStyleValue('icon-important', 'color');
  //  var admonitionblock_warning_color   = j1.getStyleValue('icon-warning', 'color');
  //  var admonitionblock_caution_color   = j1.getStyleValue('icon-caution', 'color');

      // var admonitionblock_note_color      = j1.getStyleValue('btn-info', 'background-color');
      // var admonitionblock_tip_color       = j1.getStyleValue('btn-success', 'background-color');
      // var admonitionblock_important_color = j1.getStyleValue('btn-warning', 'background-color');
      // var admonitionblock_warning_color   = j1.getStyleValue('icon-warning', 'color');
      // var admonitionblock_caution_color   = j1.getStyleValue('btn-danger', 'background-color');
      //
      // var tabs_pills_link_color_active    = j1.setColorData('md_blue');         // j1.getStyleValue('btn-info', 'background-color');
      // var tabs_pills_link_color_hover     = j1.setColorData('md_gray_300');     // j1.getStyleValue('btn-secondary', 'background-color');
      //
      // $('head').append('<style>.g-bg-primary { background-color: ' +bg_primary+ ' !important; }</style>');
      // $('head').append('<style>.mdi-md-bg-primary { color: ' +bg_primary+ '; }</style>');
      //
      // $('head').append('<style>.nav-link:hover { background-color: ' +tabs_pills_link_color_hover+ ' !important; }</style>');
      // $('head').append('<style>.nav-link.active { background-color: ' +tabs_pills_link_color_active+ ' !important; }</style>');
      //
      // $('head').append('<style>.icon-note { color: ' +admonitionblock_note_color+ ' !important; }</style>');
      // $('head').append('<style>.icon-tip { color: ' +admonitionblock_tip_color+ ' !important; }</style>');
      // $('head').append('<style>.icon-important { color: ' +admonitionblock_important_color+ ' !important; }</style>');
      // $('head').append('<style>.icon-warning { color: ' +admonitionblock_warning_color+ ' !important; }</style>');
      // $('head').append('<style>.icon-caution { color: ' +admonitionblock_caution_color+ ' !important; }</style>');

      return true;
    }, // END setCss

    // -------------------------------------------------------------------------
    // messageHandler
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);

      logText = 'received message from ' + sender + ': ' + json_message;
      logger.info(logText);

      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      if (message.type === 'command' && message.action === 'module_initialized') {
        //
        // Place handling of command|action here
        //
        logger.info(message.text);
      }
        //
        // Place handling of other command|action here
        //

      return true;
    }, // END messageHandler

    // -------------------------------------------------------------------------
    // setState
    // Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      j1.adapter.themer.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.themer.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}
