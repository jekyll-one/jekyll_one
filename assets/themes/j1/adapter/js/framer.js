---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/framer.js
 # Liquid template to adapt iFrameResizer Core functions
 #
 # Product/Info:
 # https://jekyll.one
 # http://davidjbradshaw.github.io/iframe-resizer/
 #
 # Copyright (C) 2020 Juergen Adams
 # Copyright (C) 2013-15 David J. Bradshaw
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # iFrameResizer is licensed under under the MIT License.
 # For details, see http://davidjbradshaw.github.io/iframe-resizer/
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment       = site.environment %}
{% assign template_version  = site.version %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config   = site.data.template_settings %}
{% assign blocks            = site.data.blocks %}
{% assign modules           = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign framer_defaults   = modules.defaults.framer.defaults %}
{% assign framer_settings   = modules.framer.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign framer_options    = framer_defaults | merge: framer_settings %}


/*
 # -----------------------------------------------------------------------------
 #  ~/assets/themes/j1/adapter/js/framer.js
 #  J1 Adapter for J1 iFrameResizer
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://davidjbradshaw.github.io/iframe-resizer/
 #
 #  Copyright (C) 2020 Juergen Adams
 #  Copyright (C) 2013-15 David J. Bradshaw
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  iFrameResizer is licensed under under the MIT License.
 #  For details, see http://davidjbradshaw.github.io/iframe-resizer/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
 */
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['framer'] = (function (j1, window) {

  {% comment %} Set global variables
  ------------------------------------------------------------------------------ {% endcomment %}
  var environment   = '{{environment}}';
  var moduleOptions = {};
  var _this;
  var logger;
  var logText;

  // ---------------------------------------------------------------------------
  // Helper functions
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // initialize state flag
      j1.adapter.framer.state = 'pending';

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.example',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      //
      moduleOptions = $.extend({}, {{framer_options | replace: '=>', ':' | replace: 'nil', '""'}});

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.framer;
      logger  = log4javascript.getLogger('j1.adapter.framer');

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      iFrameResize({
        log:                      moduleOptions.log,
        autoResize:               moduleOptions.autoResize,
        bodyBackground:           moduleOptions.bodyBackground,
        bodyMargin:               moduleOptions.bodyMargin,
        checkOrigin:              moduleOptions.checkOrigin,
        inPageLinks:              moduleOptions.inPageLinks,
        interval:                 moduleOptions.interval,
        heightCalculationMethod:  moduleOptions.heightCalculationMethod,
        maxHeight:                moduleOptions.maxHeight,
        minWidth:                 moduleOptions.minWidth,
        maxWidth:                 moduleOptions.maxWidth,
        minHeight:                moduleOptions.minHeight,
        resizeFrom:               moduleOptions.resizeFrom,
        scrolling:                moduleOptions.scrolling,
        sizeHeight:               moduleOptions.sizeHeight,
        sizeWidth:                moduleOptions.sizeWidth,
        tolerance:                moduleOptions.tolerance,
        widthCalculationMethod:   moduleOptions.widthCalculationMethod,
        targetOrigin:             moduleOptions.checkOrigin
      });

      _this.setState('finished');
      logger.info('state: ' + _this.getState());
      logger.info('initializing module finished');

      return true;
    }, // END init

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);

      logText = 'received message from ' + sender + ': ' + json_message;
      logger.debug(logText);

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
      j1.adapter.scroller.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.scroller.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}