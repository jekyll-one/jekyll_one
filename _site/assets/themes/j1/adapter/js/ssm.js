
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/ssm.js
 # JS Adapter for J1 SSM (Sticky Side Menu)
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Adapter generated: 2020-07-04 19:52:02 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['ssm'] = (function (j1, window) {
  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment         = '';
  var dclFinished         = false;
  var moduleOptions       = {};
  var cookie_names        = j1.getCookieNames();
  var user_state;
  var user_session;
  var user_data;
  var sect1Nodes;
  var sect12Nodes;
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // helper functions
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // module initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // create seetings object from frontmatterOptions
      var frontmatterOptions = options != null ? $.extend({}, options) : {};
      // initialize state flag
      j1.adapter.ssm.state = 'pending';
      // -----------------------------------------------------------------------
      // defaults
      // -----------------------------------------------------------------------
      var settings  = $.extend({
        module_name: 'j1.adapter.ssm',
        generated:   '2020-07-04 19:52:02 +0200'
      }, options);
      // -----------------------------------------------------------------------
      // globals
      // -----------------------------------------------------------------------
      _this         = j1.adapter.ssm;
      logger        = log4javascript.getLogger('j1.adapter.ssm');
      sect12Nodes   = $("[class$='sect1'],[class$='sect2'");
      sect1Nodes    = $("[class$='sect1']");
      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      var ssmMenuOptions = $.extend({}, );
      var ssmOptions = $.extend({}, {"enabled":true, "xhr_container_id":"ssm-container", "xhr_data_path":"/assets/data/ssm/index.html", "icon_family":"MDI", "icon_color":"mdi-md-grey", "icon_size":"mdi-2x", "min_width":200, "margin":-140, "mode":"icon", "items":[{"item":"Reload Page", "enabled":true, "id":"ssm_reload_page", "href":null, "target":null, "event_handler":"reload_page", "icon":"reload", "icon_classes":null}, {"item":"Table of Contents", "enabled":true, "id":"ssm_toc", "href":null, "target":null, "event_handler":"open_ssm_toc", "icon":"wrap", "icon_classes":null}, {"item":"To Top", "enabled":true, "id":"ssm_scroll_to_top", "event_handler":"scroll_to_top", "href":null, "target":null, "icon":"step-backward-2", "icon_classes":"mdi-rotate-90"}, {"item":"Previous Section", "enabled":true, "id":"ssm_previous_section", "event_handler":"scroll_previous_section", "href":null, "target":null, "icon":"step-backward", "icon_classes":"mdi-rotate-90"}, {"item":"Next Section", "enabled":true, "id":"ssm_next_section", "event_handler":"scroll_next_section", "href":null, "target":null, "icon":"step-forward", "icon_classes":"mdi-rotate-90"}, {"item":"To Bottom", "enabled":true, "id":"ssm_scroll_to_bottom", "event_handler":"scroll_to_bottom", "href":null, "target":null, "icon":"step-forward-2", "icon_classes":"mdi-rotate-90"}, {"item":"Leave a Comment", "enabled":false, "id":"ssm_scroll_to_comments", "event_handler":"scroll_to_comments", "href":null, "target":null, "icon":"comment", "icon_classes":null}, {"item":"Tester", "enabled":false, "id":"ssm_test", "href":null, "target":null, "event_handler":"alert_me", "icon":"alert", "icon_classes":null}, {"item":"Social Share", "enabled":false, "icon":"menu", "icon_classes":null, "sublevel":[{"title":"Facebook", "enabled":true, "id":"ssm_facebook", "href":"https://www.facebook.com/sharer/sharer.php?u=http://demo.enigmaweb.com.au/", "target":null, "event_handler":"window.open(this.href, 'facebook', 'left=60,top=40,width=500,height=500,toolbar=1,resizable=0'); return false;", "icon":"facebook", "icon_classes":null}, {"title":"Twitter", "enabled":true, "id":"ssm_twitter", "href":"https://twitter.com/home?status=http://demo.enigmaweb.com.au/", "target":null, "event_handler":"window.open(this.href, 'twitter', 'left=60,top=40,width=500,height=500,toolbar=1,resizable=0'); return false;", "icon":"twitter", "icon_classes":null}]}]});
      var xhr_data_path;
      var menu_id;
      // Load (individual) frontmatter options (currently NOT used)
      //
      if (options != null) { var frontmatterOptions = $.extend({}, options) }
      if (typeof frontmatterOptions !== 'undefined') {
        moduleOptions = j1.mergeData(ssmOptions, frontmatterOptions);
      }
      // save config settings into the mmenu object for global access
      //
      j1.adapter.ssm['moduleOptions'] = moduleOptions;
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      // jadams, 2020-06-24: Set max_count to 100 what cause to wait 2.5s
      // for J1 Navigator to finish (init)
      //
      var interval_count = 0;
      var max_count      = 100;
      var dependencies_met_navigator = setInterval(function() {
        interval_count += 1;
        if ( j1.adapter.navigator.getState() == 'finished' ) {
          logger.info('dependencies of module navigator met for: mmenu');
          logger.info('dependencies of module navigator met after: ' + interval_count * 25 + ' ms');
          j1.core.ssm.init (moduleOptions);
          _this.ssmLoader(moduleOptions);
          clearInterval(dependencies_met_navigator);
        }
        if (interval_count > max_count) {
          logger.warn('dependency check failed for module: navigator');
          logger.warn('dependencies of module navigator met after: ' + interval_count * 25 + ' ms');
          j1.core.ssm.init (moduleOptions);
          _this.ssmLoader(moduleOptions);
          clearInterval(dependencies_met_navigator);
        }
      }, 25);
    }, // END init
    // -------------------------------------------------------------------------
    // SSM Loader
    // -------------------------------------------------------------------------
    ssmLoader: function (ssmOptions) {
      var menu_id;
      var xhr_data_path;
      // cast text-based booleans
      var isToc = (ssmOptions.toc === 'true');
      _this.setState('loading');
      logger.info('status: ' + _this.getState());
      logger.info('load HTML data for ssm');
      $.when (
        j1.xhrData (
          'j1.adapter.ssm', {
          xhr_container_id: "ssm-container",
          xhr_data_path:    "/assets/data/ssm/index.html" },
          'data_loaded')
      ).done (function (ssm) {
        // ---------------------------------------------------------------------
        // Initialize MMenu Navs and Drawers
        // ---------------------------------------------------------------------
        var dependencies_met_mmenu_initialized = setInterval (function () {
          if (ssm) {
            if(isToc) {
              logger.info('toc enabled in page');
              if ( j1.adapter.toccer.getState() == 'finished' ) {
                logger.info('initializing toccer: finished');
                _this.setState('processing');
                logger.info('status: ' + _this.getState());
                logger.info('initialize ssm menu');
                if ( ssmOptions.mode === 'icon') {
                  logger.info('icon mode detected');
                }
                _this.scrollSpy(ssmOptions);
                _this.buttonInitializer(ssmOptions);
                clearInterval(dependencies_met_mmenu_initialized);
              }
            } else {
              logger.info('toc disabled in page');
              $('#ssm_toc').closest('.ssm-btn').hide()
              _this.scrollSpy(ssmOptions);
              _this.buttonInitializer(ssmOptions);
              clearInterval(dependencies_met_mmenu_initialized);
            }
          } else {
            logger.error('initialize ssm failed, HTML data NOT loaded');
          }
        }, 25); // END dependencies_met_mmenu_loaded
      }); // END done
    }, // END dataLoader
    // -------------------------------------------------------------------------
    // Button Initializer
    // -------------------------------------------------------------------------
    buttonInitializer: function (ssmOptions) {
      var eventHandler;
      // Create an eventhandler instance if id exists: ssm_reload_page
      if ($('#ssm_reload_page').length) {
        eventHandler = "reload_page"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler reload_page on id: ssm_reload_page');
          $('#ssm_reload_page').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.reload_page(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_reload_page');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
      // Create an eventhandler instance if id exists: ssm_toc
      if ($('#ssm_toc').length) {
        eventHandler = "open_ssm_toc"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler open_ssm_toc on id: ssm_toc');
          $('#ssm_toc').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.open_ssm_toc(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_toc');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
      // Create an eventhandler instance if id exists: ssm_scroll_to_top
      if ($('#ssm_scroll_to_top').length) {
        eventHandler = "scroll_to_top"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler scroll_to_top on id: ssm_scroll_to_top');
          $('#ssm_scroll_to_top').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.scroll_to_top(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_scroll_to_top');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
      // Create an eventhandler instance if id exists: ssm_previous_section
      if ($('#ssm_previous_section').length) {
        eventHandler = "scroll_previous_section"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler scroll_previous_section on id: ssm_previous_section');
          $('#ssm_previous_section').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.scroll_previous_section(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_previous_section');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
      // Create an eventhandler instance if id exists: ssm_next_section
      if ($('#ssm_next_section').length) {
        eventHandler = "scroll_next_section"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler scroll_next_section on id: ssm_next_section');
          $('#ssm_next_section').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.scroll_next_section(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_next_section');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
      // Create an eventhandler instance if id exists: ssm_scroll_to_bottom
      if ($('#ssm_scroll_to_bottom').length) {
        eventHandler = "scroll_to_bottom"
        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler scroll_to_bottom on id: ssm_scroll_to_bottom');
          $('#ssm_scroll_to_bottom').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.scroll_to_bottom(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: ssm_scroll_to_bottom');
        }
      } // END items (buttons)
       // menu_type 'top_level_item'
       // ENDIF button_id enabled
        // ENDIF button_id enabled
        // ENDIF button_id enabled
        // ENDIF button_id enabled
       // ENDFOR items
    }, // END buttonInitializer
    // -------------------------------------------------------------------------
    // Eventhandler
    // -------------------------------------------------------------------------
    // open mobile menu
    // -------------------------------------------------------------------------
    open_ssm_toc: function () {
      logger.info('eventhandler fired on id: ' + id );
    }, // END open_ssm_toc
    // -------------------------------------------------------------------------
    // reload page
    // -------------------------------------------------------------------------
    reload_page: function () {
      logger.info('reload page');
      location.reload();
    }, // END open_ssm_toc
    // -------------------------------------------------------------------------
    // scroll to previous section
    // -------------------------------------------------------------------------
    scroll_previous_section: function (nodes) {
      var previous_header_id;
      var currentNode;
      var prev_node;
      var anchor_id;
      var index             = 0;
      var maxNode           = $(nodes).length - 1;
      var $toc              = $("#sidebar");
      var current_header_id = $toc.find(".is-active-link").attr('href');
      // logger.info('eventhandler fired on id: ' + id );
      nodes.each(function() {
        currentNode = $(this).find(current_header_id);
        if (currentNode.length) {
          if (index > maxNode) {
            return false
          } else {
            prev_node           = (index > 0) ? nodes[index-1] : nodes[index];
            previous_header_id  = $(prev_node).find(":header").first()[0].id;
            anchor_id           = '#' + previous_header_id;
            $('a[href*="' + current_header_id + '"]').removeClass('is-active-link');
            $('a[href*="' + previous_header_id + '"]').addClass('is-active-link');
            j1.core.scrollSmooth.scroll( anchor_id, {
              duration: 300,
              offset: -80,
              callback: null
            });
            return false;
          }
        }
        (index < maxNode) ? index++ : index;
      });
    }, // END scroll_previous_section
    // -------------------------------------------------------------------------
    // scroll to next section
    // -------------------------------------------------------------------------
    scroll_next_section: function (nodes) {
      var next_header_id;
      var currentNode;
      var nextNode;
      var anchor_id;
      var index             = 0;
      var maxNode           = $(nodes).length -1;
      var $toc              = $("#sidebar");
      var current_header_id = $toc.find(".is-active-link").attr('href');
      // logger.info('eventhandler fired on id: ' + id );
      nodes.each(function() {
        currentNode = $(this).find(current_header_id);
        if (currentNode.length) {
          if (index == maxNode) {
            return false
          } else {
            nextNode = nodes[index+1];
            next_header_id  = $(nextNode).closest().find(":header").first();
            next_header_id  = $(nextNode).find(":header").first()[0].id;
            anchor_id       = '#' + next_header_id;
            $('a[href*="' + current_header_id + '"]').removeClass('is-active-link');
            $('a[href*="' + next_header_id + '"]').addClass('is-active-link');
            j1.core.scrollSmooth.scroll( anchor_id, {
              duration: 300,
              offset: -80,
              callback: null
            });
            return false;
          }
        }
        (index < maxNode) ? index++ : index;
      });
    }, // END scroll_next_section
    // -------------------------------------------------------------------------
    // scroll to top
    // -------------------------------------------------------------------------
    scroll_to_top: function () {
      var dest = 0;
      // logger.info('eventhandler fired on id: ' + id );
      $('html, body').animate({
        scrollTop: dest
      }, 500);
    }, // END scroll_top
    // -------------------------------------------------------------------------
    // scroll to bottom
    // -------------------------------------------------------------------------
    scroll_to_bottom: function () {
      var $page           = $(document);
      var $footer         = $('#j1_footer');
      var f               = $footer.length ? $footer.outerHeight() : 0;
      var pageHeight      = $page.height() - f - 400;
      var pageHeightOuter = $page.outerHeight()
      // logger.info('eventhandler fired on id: ' + id );
      $('html, body').animate({
        scrollTop: pageHeight
      }, 500);
    }, // END scroll_bottom
    // -------------------------------------------------------------------------
    // scroll to comments (Disqus)
    // -------------------------------------------------------------------------
    scroll_to_comments: function () {
      // logger.info('eventhandler fired on id: ' + id );
    }, // END scroll_comments
    // -------------------------------------------------------------------------
    // create generic alert
    // -------------------------------------------------------------------------
    alert_me: function () {
      logger.info('eventhandler fired for: alert_me');
      alert ("Hello world!");
    }, // END alert_me
    // -------------------------------------------------------------------------
    // messageHandler
    // Manage messages (paylods) send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      // var json_message = JSON.stringify(message, undefined, 2);              // multiline
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
      if (message.type === 'command' && message.action === 'status') {
        logger.info('messageHandler: received - ' + message.action);
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
      j1.adapter.ssm.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.ssm.state;
    }, // END state
    // -------------------------------------------------------------------------
    // Manage (top) position and sizes (@media breakpoints) of the
    // SSM container depending on the size of the page header (attic)
    // -------------------------------------------------------------------------
    scrollSpy: function (options) {
      logger = log4javascript.getLogger('j1.adapter.ssm.scrollSpy');
      $(window).scroll(function(event){
        var $navbar         = $('nav.navbar');
        var $pagehead       = $('.attic');
        var $main_content   = $('.js-toc-content');
        var $adblock        = $('#adblock');
        var $footer         = $('#j1_footer');
        var $ssmContainer   = $('#ssm-container');
        var $page           = $(document);
        var offset          = 0;
        var pageOffset      = -120;
        var scrollPos       = $(document).scrollTop();
        var pageHeight      = $page.height()
        var pageHeightOuter = $page.outerHeight()
//      var m               = parseInt(pagehead.css('margin-bottom'), 10);
        var m               = $main_content.offset().top;
        var s               = $ssmContainer.length ? $ssmContainer.height() : 0;
        var f               = $footer.length   ? $footer.outerHeight() : 0;
        var n               = $navbar.length   ? $navbar.height() : 0;
//      var h               = $pagehead.length ? $pagehead.outerHeight() : 0;
        var a               = $adblock.length  ? $adblock.outerHeight() : 0;
//      var o               = n + h + a + offset;
//      var o               = n + m + offset;
        var o               = n + offset;
        // space above the (fixed) ssm container
        var showSsmPos      = m + pageOffset;
        // space below the (fixed) ssm container
        var hideSsmPos      = pageHeight - s - f + pageOffset;
        // set the top position of ssm container for navbar modes
        // e.g. "sticky" (navbar-fixed)
        if($navbar.hasClass('navbar-fixed')){
          $('#ssm-container').css('top', o);
        } else {
          $('#ssm-container').css('top', m);
        }
        // show|hide ssm container on scroll position in page
        //
        ( scrollPos >= showSsmPos ) && ( scrollPos <= hideSsmPos )
          ? $ssmContainer.css('display','block')
          : $ssmContainer.css('display','none');
        logger.debug('content pos detected as: ' + m + 'px');
        logger.debug('scroll pos detected as: ' + scrollPos + 'px');
      }); // END setTop on scroll
    } // END scrollSpy
  }; // END return
})(j1, window);


