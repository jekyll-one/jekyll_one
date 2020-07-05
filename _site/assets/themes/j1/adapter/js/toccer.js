
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
 # Adapter generated: 2020-07-05 11:53:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['toccer'] = (function () {
  var environment   = 'production'; // Set environment
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
        settings.collapseDepth = 2;
      }
      if (settings.scrollSmoothOffset === undefined) {
        settings.scrollSmoothOffset = -90;
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
            log:                    false,
            activeLinkColor:        null,
            tocSelector:            ".js-toc",
            headingSelector:        "h2, h3, h4, h5",
            ignoreSelector:         ".notoc",
            contentSelector:        ".js-toc-content",
            collapseDepth:          settings.collapseDepth,
            throttleTimeout:        50,
            hasInnerContainers:     false,
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
            scrollSmooth:           true,
            scrollSmoothDuration:   300,
            scrollSmoothOffset:     -90,
            headingsOffset:         1,
            throttleTimeout:        50
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


