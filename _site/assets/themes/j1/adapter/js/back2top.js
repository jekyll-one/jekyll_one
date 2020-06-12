
/*
 # -----------------------------------------------------------------------------
 #  ~/assets/themes/j1/adapter/js/back2top.js
 #  JS Adapter for J1 Back2Top
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://dynamicdrive.com/dynamicindex3/scrolltop.htm
 #
 #  Copyright (C) 2020 Juergen Adams
 #  Copyright (C) 2009 dynamicdrive.com
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2020-06-12 17:59:56 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['back2top'] = (function (j1, window) {
  var environment    = 'development';
  var moduleOptions  = {};
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
      j1.adapter.back2top.state = 'pending';
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.back2top',
        generated:   '2020-06-12 17:59:56 +0200'
      }, options);
      _this   = j1.adapter.back2top;
      logger  = log4javascript.getLogger('j1.adapter.back2top');
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {"enabled":true, "active_color":"md_indigo", "background_color":"md_grey_900", "icon":"f05d", "icon_family":"MDI", "icon_position":"absolute", "startline":100, "scrollto":0, "scrollduration":1000, "fadeduration":{"fadeIn":500, "fadeOut":500}, "controlattrs":{"offsetx":5, "offsety":5}});
      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
      if (moduleOptions.enabled) {
        _this.setState('started');
        logger.info('state: ' + _this.getState());
        logger.info('module is being initialized');
        _this.setCss();
        j1.core.back2top.init(moduleOptions);
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
      } else {
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.warn('module back2top disabled');
      }
      return true;
    }, // END init
    // -------------------------------------------------------------------------
    // Set dynamic styles for Back2Top
    // -------------------------------------------------------------------------
    setCss: function () {
      var bg_primary  = j1.getStyleValue('bg-primary', 'background-color');
      var dependencies_met_back2top_adapter = setInterval(function() {
        if (typeof j1.colors !== 'undefined') {
          $('head').append('<style>#topcontrol { background: ' + j1.colors['md_grey_900'] + '; }</style>');
          // $('head').append('<style>#topcontrol:hover { background: ' + j1.colors['md_indigo'] + '; }</style>');
          $('head').append('<style>#topcontrol:hover { background: ' +bg_primary+ '; }</style>');
          $('head').append('<style>#topcontrol:after { content: "\\f05d"; font-family: Material Design Icons; }</style>');
          // clear interval checking
          clearInterval(dependencies_met_back2top_adapter);
        } // END 'getState'
      }, 50); // END 'dataLoaded'
      return true;
    }, // END setCss
    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      // var json_message = JSON.stringify(message, undefined, 2);
      var json_message = JSON.stringify(message);
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

