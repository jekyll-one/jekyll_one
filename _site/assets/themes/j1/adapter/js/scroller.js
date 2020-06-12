
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/smooth_scroll.js
 # JS Adapter for J1 Scroller (SmoothScroll)
 #
 # Product/Info:
 # http://jekyll.one
 # https://github.com/galambalazs/smoothscroll-for-websites
 #
 # Copyright (C) 2020 Juergen Adams
 # Copyright (C) 2010-2016 Balazs Galambosi
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # Smooth Scroll is licensed under the MIT License.
 # For details, https://github.com/galambalazs/smoothscroll-for-websites
 # -----------------------------------------------------------------------------
 # Adapter generated: 2020-06-12 17:59:03 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['scroller'] = (function (j1, window) {
  var environment   = 'development';
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
    init: function () {
      // initialize state flag
      j1.adapter.scroller.state = 'pending';
      _this   = j1.adapter.scroller;
      logger  = log4javascript.getLogger('j1.adapter.scroller');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('Module is being initialized');
      SmoothScroll({
        frameRate:              150,
        animationTime:          400,
        stepSize:               100,
        accelerationDelta:      50,
        accelerationMax:        3,
        keyboardSupport:        true,
        arrowScroll:            50,
        pulseAlgorithm:         true,
        pulseScale:             4,
        pulseNormalize:         1,
        touchpadSupport:        false,
        fixedBackground:        true,
        excluded:               null,
      });
      _this.setState('finished');
      logger.info('state: ' + _this.getState());
      return true;
    }, // END init
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

