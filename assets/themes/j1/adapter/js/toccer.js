---
regenerate:                             true
---

{% capture j1_cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/toccer.js
 # Liquid template to adapt Tocbot Core functions
 #
 # Product/Info:
 # https://jekyll.one
 # https://tscanlin.github.io/tocbot
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # Tocbot is licensed under under the MIT License.
 # For details, see https://tscanlin.github.io/tocbot
 # -----------------------------------------------------------------------------
 # TODO:
 # 2019-03-10:  Old BS Affix code is to be removed
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
{% assign site_config       = site %}
{% assign template_config   = site.data.template_settings %}
{% assign blocks            = site.data.blocks %}
{% assign modules           = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign toccer_defaults   = modules.defaults.toccer.defaults %}
{% assign toccer_settings   = modules.toccer.settings %}
{% assign footer_config     = modules.j1_footer %}
{% assign footer_id         = modules.j1_footer.global.id %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign toccer_options    = toccer_defaults | merge: toccer_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/toccer.js
 # JS Adapter for J1 Toccer
 #
 # Product/Info:
 # https://jekyll.one
 # https://tscanlin.github.io/tocbot
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # Tocbot is licensed under under the MIT License.
 # For details, see https://tscanlin.github.io/tocbot
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['toccer'] = (function () {

  {% comment %} Set global variables
  ------------------------------------------------------------------------------ {% endcomment %}
  var environment   = '{{environment}}'; // Set environment
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
      j1.adapter.toccer.state = 'pending';

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.toccer;
      logger  = log4javascript.getLogger('j1.adapter.toccer');

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('Module is being initialized');

      if (options  !== undefined) {
        var settings = $.extend({}, options);
      } else {
        var settings = false;
      }

      // cast text-based booleans
      var  isToc = (options.toc === 'true');
      var  isComments = (options.comments === 'true');

      if (settings.collapseDepth === undefined) {
        settings.collapseDepth = {{toccer_options.collapseDepth}};
      }

      if (settings.scrollSmoothOffset === undefined) {
        settings.scrollSmoothOffset = {{toccer_options.scrollSmoothOffset}};
      }

      if (settings.enabled === undefined) {
        settings.enabled = true;
      }

      if (isToc) {
        _this.initToccerCore(settings);
        // set state finished if tocbot has created the toc
        var dependencies_met_toccer_initialized = setInterval (function () {
          if ($('ol.toc-list ').length) {
            _this.setState('finished');
            logger.info('state: ' + _this.getState());
            logger.info('module initialized successfully');
            clearInterval(dependencies_met_toccer_initialized);
          }
        }, 25);
      }
    }, // END init

    // -------------------------------------------------------------------------
    // Set Toccer options
    // -------------------------------------------------------------------------
    initToccerCore: function (options) {

      if (options  !== undefined) {
        var settings = $.extend({}, options);
      } else {
        var settings = false;
      }

      _this.setState('running');
      logger.info('state: ' + _this.getState());

      // tocbot get fired if HTML portion is loaded (AJAX load finished)
      var dependencies_met_ajax_load_finished = setInterval (function () {
        if ($('#toc_mmenu').length) {
          tocbot.init({
            log:                    {{ toccer_options.log | json }},
            activeLinkColor:        {{ toccer_options.activeLinkColor | json }},
            tocSelector:            {{ toccer_options.tocSelector | json }},
            headingSelector:        {{ toccer_options.headingSelector | json }},
            ignoreSelector:         {{ toccer_options.ignoreSelector | json }},
            contentSelector:        {{ toccer_options.contentSelector | json }},
            collapseDepth:          settings.collapseDepth,
            throttleTimeout:        {{ toccer_options.throttleTimeout | json }},
            includeHtml:            false,
            linkClass:              'toc-link',
            extraLinkClasses:       '',
            activeLinkClass:        'is-active-link',
            listClass:              'toc-list',
            extraListClasses:       '',
            isCollapsedClass:       'is-collapsed',
            collapsibleClass:       'is-collapsible',
            listItemClass:          'toc-list-item',
            positionFixedSelector:  '',
            positionFixedClass:     'is-position-fixed',
            fixedSidebarOffset:     'auto',
            scrollSmooth:           {{ toccer_options.scrollSmooth | json }},
            scrollSmoothDuration:   {{ toccer_options.scrollSmoothDuration | json }},
            scrollSmoothOffset:     {{ toccer_options.scrollSmoothOffset | json }},
            headingsOffset:         {{ toccer_options.headingsOffset | json }},
            throttleTimeout:        {{ toccer_options.throttleTimeout | json }}
          });
          clearInterval(dependencies_met_ajax_load_finished);
        } // END AJAX load finished
      }, 25); // END dependencies_met_ajax_load_finished
    }, // END initToccerCore

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 NAV module
    // Manage messages (paylods) send from other J1 modules
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
    //  Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      j1.adapter.toccer.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    //  Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.toccer.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ j1_cache | strip_empty_lines }}
{% assign j1_cache = nil %}
