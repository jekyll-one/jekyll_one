---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/searcher.js
 # Liquid template to adapt SimpleJekyllSearch Core functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment             = site.environment %}
{% assign template_version        = site.version %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config         = site.data.template_settings %}
{% assign blocks                  = site.data.blocks %}
{% assign modules                 = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jekyll_search_defaults = modules.defaults.jekyll_search.defaults %}
{% assign jekyll_search_settings = modules.jekyll_search.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jekyll_search_options  = jekyll_search_defaults | merge: jekyll_search_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/searcher.js
 # JS Adapter for J1 Searcher (SimpleJekyllSearch)
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/christian-fei/Simple-Jekyll-Search
 #
 # Copyright (C) 2020 Juergen Adams
 # Copyright (C) 2015 Christian Fei
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # SimpleJekyllSearch is licensed under the MIT License.
 # For details, see https://github.com/christian-fei/Simple-Jekyll-Search
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['searcher'] = (function (j1, window) {

  {% comment %} Set global variables
  ------------------------------------------------------------------------------ {% endcomment %}
  var environment   = '{{environment}}';
  var moduleOptions = {};
  var _this;
  var logger;
  var logText;

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // initialize state flag
      j1.adapter.searcher.state = 'pending';

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.searcher',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.searcher;
      logger  = log4javascript.getLogger('j1.adapter.searcher');

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {{jekyll_search_options | replace: '=>', ':' | replace: 'nil', '""'}});

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      if (moduleOptions.enabled) {
        _this.setState('started');
        logger.info('state: ' + _this.getState());
        logger.info('Module is being initialized');

        var jekyllSearch = SimpleJekyllSearch({
          searchInput:          document.getElementById(moduleOptions.search_input),
          resultsOutput:        document.getElementById(moduleOptions.results_output),
          resultsContainer:     document.getElementById(moduleOptions.results_container),
          json:                 moduleOptions.index_data,
          searchResultTemplate: moduleOptions.result_template,
          limit:                moduleOptions.result_limit,
          minSearchItemLen:     moduleOptions.min_search_item_len,
          fuzzy:                moduleOptions.search_fuzzy,
          exclude:              moduleOptions.search_exlude,
          noResultsText:        moduleOptions.no_results_text
        });

        _this.setState('finished');
        logger.info('state: ' + _this.getState());
      } else {
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.info("module disabled");
      }

      return true;
    }, // END init

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
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
      j1.adapter.searcher.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.searcher.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}