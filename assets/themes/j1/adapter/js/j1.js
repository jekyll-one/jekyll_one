---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/core/js/j1.js
 # Liquid template to initialize J1 Template Core functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # TODO: jadams, 2019-01-20: Isolate drawer, switch from BME code
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment             = site.environment %}
{% assign template_version        = site.version %}

{% if site.permalink == 'none' %}
   {% capture page_url %}{{ site.url }}.html{% endcapture %}
{% else %}
   {% capture page_url %}{{ site.url }}{% endcapture %}
{% endif %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config         = site.data.template_settings %}
{% assign blocks                  = site.data.blocks %}
{% assign modules                 = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign banner_config_defaults  = blocks.defaults.banner.defaults %}
{% assign banner_config_settings  = blocks.banner.settings %}
{% assign panel_config_defaults   = blocks.defaults.panel.defaults %}
{% assign panel_config_settings   = blocks.panel.settings %}
{% assign footer_config_defaults  = blocks.defaults.footer.defaults %}
{% assign toccer_defaults         = modules.defaults.toccer.defaults %}
{% assign toccer_settings         = modules.toccer.settings %}
{% assign themer_defaults         = modules.defaults.themer.defaults %}
{% assign themer_settings         = modules.themer.settings %}

{% assign authentication_defaults = modules.defaults.authentication.defaults %}
{% assign authentication_settings = modules.authentication.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign toccer_options          = toccer_defaults | merge: toccer_settings %}
{% assign themer_options          = themer_defaults | merge: themer_settings %}

{% assign authentication_options  = authentication_defaults | merge: authentication_settings %}

{% assign footer_id               = footer_config_defaults.container-id %}
{% assign footer_data_path        = footer_config_defaults.data_path %}
{% assign banner_data_path        = banner_config_defaults.data_path %}
{% assign panel_data_path         = panel_config_defaults.data_path %}

{% assign hideOnReload            = modules.themer_options.hideOnReload %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/j1_template.js
 # JS Adapter for J1 Template
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 #  TODO:
 #    MANAGE themeExtensionCss is to be checked
 #
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

var j1 = (function () {

  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var rePager         = new RegExp('navigator|dateview|tagview|archive');
  var environment     = '{{environment}}';
  var moduleOptions   = {};
  var j1_runtime_data = {};

  // Status information
  var state         = 'not_started';
  var mode          = 'not_detected';

  var current_user_data;
  var current_page;
  var previous_page;
  var last_pager;
  var last_pager_url;
  var app_detected;
  var user_session_detected;

  // Connector settings
  var translation_enabled = {{template_config.translation.enabled}}

  // Theme information
  var themeName;
  var themeCss;
  var themeExtensionCss = environment === 'production' ? '/assets/themes/j1/core/css/theme_extensions.min.css' : '/assets/themes/j1/core/css/theme_extensions.css';

  // Pathes of J1 data files
  var colors_data_path          = '{{template_config.colors_data_path}}';
  var font_size_data_path       = '{{template_config.font_size_data_path}}';
  var runtime_data_path         = '{{template_config.runtime_data_path}}';
  var message_catalog_data_path = '{{template_config.message_catalog_data_path}}';

  // Logger
  var logger;
  var logText;

  var _this;
  var settings;
  var json_data;
  var ep;
  var baseUrl;
  var referrer;

  var default_theme_css           = environment === 'production' ? '/assets/themes/j1/core/css/uno.min.css' : '/assets/themes/j1/core/css/uno.css';
  var default_theme_name          = 'Uno';
  var default_theme_author        = 'J1 Team';
  var default_theme_link          = 'https://jekyll.one/';
  var default_white_listed_pages  = [];

  var cookie_names = {
    'app_session':  '{{template_config.cookies.app_session}}',
    'user_session': '{{template_config.cookies.user_session}}',
    'user_state':   '{{template_config.cookies.user_state}}'
  }

  // user SESSION cookie (initial values)
  var user_session = {
    'mode':                 'na',
    'locale':               navigator.language || navigator.userLanguage,
    'user_name':            '{{template_config.user.user_name}}',
    'provider':             '{{template_config.user.provider}}',
    'provider_membership':  '{{template_config.user.provider_membership}}',
    'provider_permissions': 'public,{{template_config.user.provider_permissions}}',
    'provider_site_url':    '{{template_config.user.provider_site_url}}',
    'provider_home_url':    '{{template_config.user.provider_home_url}}',
    'provider_blog_url':    '{{template_config.user.provider_blog_url}}',
    'provider_member_url':  '{{template_config.user.provider_member_url}}',
    'provider_privacy_url': '{{template_config.user.provider_privacy_url}}',
    'requested_page':       'na',
    'previous_page':        'na',
    'last_pager':           '/pages/public/blog/navigator/'
  };

  // user STATE cookie (initial values)
  var user_state = {
    'theme_css':            default_theme_css,
    'theme_extension_css':  themeExtensionCss,
    'theme_name':           default_theme_name,
    'theme_author':         default_theme_author,
    'theme_author_url':     '{{template_config.theme_author_url}}',
    'theme_link':           default_theme_link,
    'theme_version':        '{{site.version}}',
    'cookies_accepted':     'pending',
    'whitelistedPages':     default_white_listed_pages,
    'deleteOnDecline':      false,
    'showConsentOnPending': false,
    'stopScrolling':        true,
    'session_active':       false,
    'last_session_ts':      '',
    'cc_authenticated':     false
  };

  // ---------------------------------------------------------------------------
  // helper functions
  // ---------------------------------------------------------------------------

  function executeFunctionByName(functionName, context /*, args */) {
    // See: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
    //
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }

  // ---------------------------------------------------------------------------
  // main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {

      // -----------------------------------------------------------------------
      // global var (function)
      // -----------------------------------------------------------------------
      var logger        = log4javascript.getLogger('j1.init');
      var url           = new parseURL(window.location.href)
      var baseUrl       = url.origin;
      var epoch         = Math.floor(Date.now()/1000);
      var timestamp_now = moment.unix(epoch).format('YYYY-MM-DD HH:mm:ss');
      var curr_state    = 'started';

      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      var settings = $.extend(
        {
          foo: 'foo_option',
          bar: 'bar_option'
        },
        options
      );

      // catch senseless detect url 404 errors (middleware /status)
      // See: https://stackoverflow.com/questions/4687235/jquery-get-or-post-to-catch-page-load-error-eg-404
      $.ajaxSetup({
        // called on `$.get()`, `$.post()`, `$.ajax()`
        statusCode : {
          // raised on response status code 404
          404 : function (jqxhr, textStatus, errorThrown) {
            var interval_count = 0;
            var max_count      = 10;
            var dependencies_met_logger = setInterval(function() {
              interval_count += 1;
              if ( j1.adapter.logger.getState() == 'finished' ) {
                var logger = log4javascript.getLogger('j1.init');
                clearInterval(dependencies_met_logger);
                if(jqxhr.responseText.indexOf('GET /status') > -1) {
                  logger.info('no middleware found on url /status: ignored');
                  logger.info('continue on mode: web');
                }
                if (interval_count > max_count) {
                  logger.warn('dependency check failed for module: logger');
                  logger.warn('continue on initializer unchecked');
                  j1.adapter.navigator.init();
                }
              }
            }, 25);
          }
        }
       });

      // -----------------------------------------------------------------------
      // Session ON_CLOSE event
      // Update user STATE cookie|Remove user SESSION cookie on window CLOSE
      // See: https://stackoverflow.com/questions/3888902/detect-browser-or-tab-closing
      // -----------------------------------------------------------------------
      window.addEventListener('beforeunload', function (event) {
        var cookie_names              = j1.getCookieNames();
        var cookie_user_state_name    = cookie_names.user_state;
        var cookie_user_session_name  = cookie_names.user_session;
        var epoch                     = Math.floor(Date.now()/1000);
        var timestamp_now             = moment.unix(epoch).format('YYYY-MM-DD HH:mm:ss');
        var user_state                = j1.readCookie(cookie_user_state_name);
        var ep_status;
        var url;
        var baseUrl;

        user_state.session_active     = false;
        user_state.last_session_ts    = timestamp_now;

        // DANGEROUS (??): delete user session in browser using MULTI_TAB!
        // if (j1.existsCookie(cookie_names.user_session)) {
        //   var bla = cookie_names.user_session;
        //   j1.deleteCookie(cookie_names.user_session)
        // }

        j1.writeCookie({
          name: cookie_user_state_name,
          data: user_state,
          expires: 365
        });


      });

      // -----------------------------------------------------------------------
      // Initialize|Load (existing) user cookies
      // -----------------------------------------------------------------------
      user_session.created    = timestamp_now;
      user_session.timestamp  = timestamp_now;

      user_session  =  j1.existsCookie(cookie_names.user_session)
                        ? j1.readCookie(cookie_names.user_session)
                        : j1.writeCookie({
                            name:     cookie_names.user_session,
                            data:     user_session,
                          });

      user_state    =  j1.existsCookie(cookie_names.user_state)
                        ? j1.readCookie(cookie_names.user_state)
                        : j1.writeCookie({
                            name:     cookie_names.user_state,
                            data:     user_state,
                            expires:  365
                          });

      user_state.session_active = true;
      j1.writeCookie({
        name:     cookie_names.user_state,
        data:     user_state,
        expires:  365
      });

      // Detect middleware (mode 'app') and update user session cookie
      // -----------------------------------------------------------------------
      // if (user_session.mode === 'na' || user_session.mode === 'app') {
      if (user_session.mode === 'na') {
        var url           = new parseURL(window.location.href);
        var ep_status     = baseUrl + '/status' + '?page=' + window.location.pathname;
        var detectTimeout =  50;

        baseUrl       = url.origin;

        $.when ($.ajax(ep_status))
        .then(function(data) {
          var logger                  = log4javascript.getLogger('j1.init');
          user_session                = j1.readCookie(cookie_names.user_session);
          user_session.mode           = 'app';
          user_session.requested_page = window.location.pathname;
          user_session.timestamp      = timestamp_now;
          user_session                = j1.mergeData(user_session, data);
          logText                     = 'mode detected: ' + user_session.mode;

          logger.info(logText);
          logger.info('update user session cookie');
          j1.writeCookie({
            name:     cookie_names.user_session,
            data:     user_session
          });
          j1.setState(curr_state);
          logger.info('state: ' + j1.getState());
        })
        .catch(function(error) {
          // jadams, 2018-08-31: Why a hell a setTimeout is needed ???
          setTimeout (function() {
            var logger                  = log4javascript.getLogger('j1.init');
            user_session                = j1.readCookie(cookie_names.user_session);
            user_session.mode           = 'web';
            user_session.requested_page = window.location.pathname;
            user_session.timestamp      = timestamp_now;
            logText                     = 'mode detected: ' + user_session.mode;

            logger.info(logText);
            j1.writeCookie({
              name: cookie_names.user_session,
              data: user_session
            });
            j1.setState(curr_state);
            logger.info('state: ' + j1.getState());
          }, detectTimeout);
        });
      } else {
        state = 'started';
        logger.info('state: ' + state);
        logger.info('page is being initialized');
      }

      {% comment %} Deferred data loads
      See: https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done
      Load J1 Template data objects 'asychronously'
      -------------------------------------------------------------------------- {% endcomment %}

      // -----------------------------------------------------------------------
      // data loader (should be rewitten to xhrData() )
      // -----------------------------------------------------------------------
      $.when (
        j1.getColorData(colors_data_path),
        j1.getFontSizeData(font_size_data_path),
        j1.getMessageCatalog(message_catalog_data_path))
      .done (function(colorData, fontSizes, messageCatalog, runtime) {
        j1.colors     	= colorData[0];
        j1.fonts        = fontSizes[0];

        // set logger for callback|anonymous
        //
        var logger = log4javascript.getLogger('j1.init');

        logText = j1.getMessage('info', 'getState', 'text');
        logText = logText + j1.getMessage('info', 'getState', 'data_objects');
        logText = logText + j1.getMessage('info', 'getState', 'finished');
        j1.logger('j1.init', 'info', logText);

        logText = j1.getMessage('info', 'setState', 'text');
        logText = logText + j1.getMessage('info', 'setState', 'started');
        j1.logger('j1.init', 'info', logText);
        executeFunctionByName('j1.setState', window, state);

        // set logger for callback|anonymous
        var logger = log4javascript.getLogger('j1.init');

        if ( settings.scrollbar === 'false'  ) {
          $('body').addClass( 'hide-scrollbar' )
          $('html').addClass( 'hide-scrollbar-moz' )
        }

        logger.info('read user state from cookie');
        user_session = j1.readCookie(cookie_names.user_session);

        // process|update UserState
        //
        themeName                 = user_session.theme_name;
        themeCss                  = user_session.theme_css;
        themeExtensionCss         = user_session.theme_extension_css;

        // save last page access
        // See: https://stackoverflow.com/questions/3528324/how-to-get-the-previous-url-in-javascript
        // See: https://developer.mozilla.org/de/docs/Web/API/Window/history
        //
        user_session.timestamp      = timestamp_now;
        referrer                    = new parseURL(document.referrer);
        current_page                = window.location.pathname;
        user_session.requested_page = current_page;
        user_session.previous_page  = referrer.search === '' ?
                                      (referrer.pathname === '' ? current_page : referrer.pathname) :
                                      (user_session.previous_page === '' || user_session.previous_page === 'na'
                                        ? '/'
                                        : user_session.previous_page
                                      );

        // calculate last 'pager' if any
        //
        if (rePager.test(user_session.previous_page)) {
          last_pager                = user_session.previous_page;
          user_session.last_pager   = last_pager;
        } else {
          last_pager                = user_session.last_pager;
        }

        logger.info('update user session cookie');
        j1.writeCookie({
          name: cookie_names.user_session,
          data: user_session
        });

        // ---------------------------------------------------------------------
        // Initialize page resources for global modules (sequential asynchronous)
        // (should be rewitten to xhrData() )
        // ---------------------------------------------------------------------
        $.when (
          j1.initBanner(settings),
          j1.initPanel(settings),
          j1.initFooter(settings) )
        .then (function (initBanner_response, initPanel_response, initFooter_response) {
          var logger  = log4javascript.getLogger('j1.init');

          // Wait for LAST thenable (footer) in chain finishes
          var footerLoaded = setInterval(function() {
            if ( j1.getState() == 'footer_loaded') {
              // clear interval checking
              clearInterval(footerLoaded);
              logger.info('loading data completed');

              // Continue to run initializers
              //
              state       = j1.getMessage('info', 'setState', 'running');
              logText     = j1.getMessage('info', 'setState', 'text');
              logText     = logText + j1.getMessage('info', 'setState', 'running');
              j1.logger('j1.init', 'info', logText);

              user_session.timestamp = timestamp_now;
              j1.writeCookie({
                name: cookie_names.user_session,
                data: user_session
              });

              // ---------------------------------------------------------------
              // Finalize|Display page (sequential asynchronous)
              // NOTE:
              //  jadams 2019-01-20: for MDB, enabled only drawer, switch
              //  and ripples
              // ---------------------------------------------------------------
              $.when (
                j1.initMDB(settings),
                j1.initClipboard(settings))
              .then (function () {
                j1.displayPage();
              })
              .catch(function(error) {
                var logger  = log4javascript.getLogger('j1.init');
                json_data   = JSON.stringify(error, undefined, 2);
                logText     = 'deferred: ' + json_data;
                logger.error(logText);
              });
            }
          }, 25); // END 'footerLoaded'
        }) // END load global modules
        .catch(function(error) {
          var logger  = log4javascript.getLogger('j1.init');
          json_data   = JSON.stringify(error, undefined, 2);
          logText     = 'deferred: ' + json_data;
          logger.error(logText);
        });
      }) // END load global data objects
      .catch(function(error) {
        var logger  = log4javascript.getLogger('j1.init');
        json_data   = JSON.stringify(error, undefined, 2);
        logText     = 'deferred: ' + json_data;
        logger.error(logText);
      });

    }, // END init

    // -------------------------------------------------------------------------
    // initBanner
    // AJAX fetcher to load and place all banner used for a page
    // -------------------------------------------------------------------------
    initBanner: function (options) {
      var logger        = log4javascript.getLogger('j1.initBanner');
      var banner        = [];
      var bannerOptions = [];
      var mod           = 'j1';

      {% comment %}
      Closure to pass additional data (e.g. #banner_id) to AJAX load callback
      See: http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
      -------------------------------------------------------------------------- {% endcomment %}
      var cb_load_closure = function(banner_id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt ==  'success' ) {
            logText = 'loading banner completed on id: ' +banner_id;
            logger.info(logText);
          }
          if ( statusTxt == 'error' ) {
            logText = 'loading banner failed on id: ' +banner_id+ ', error: ' + xhr.status + ': ' + xhr.statusText;
            logger.error(logText);
            // Set|Log status
            state = 'failed';
            logger.error('state: ' + state);
          }
        };
      };

      {% comment %} Collect all banner id|s configured
      -------------------------------------------------------------------------- {% endcomment %}
      {% for items in banner_config_settings %}
        {% assign key   = items[0] %}
        {% assign value = items[1] %}

        {% if key == 'divider'    %}  {% assign banner_config  = value %} {% endif %}
        {% if key == 'teaser'     %}  {% assign banner_config  = value %} {% endif %}
        {% if key == 'image'      %}  {% assign banner_config  = value %} {% endif %}
        {% if key == 'parallax'   %}  {% assign banner_config  = value %} {% endif %}
        {% if key == 'exception'  %}  {% assign banner_config  = value %} {% endif %}

        {% for items in banner_config %}
          {% for banners in items %}

            {% for banner in banners %}
                {% for item in banner %}
                  {% assign key = item[0] %}
                  {% assign value = item[1] %}

                  {% if key and debug %} item:value  {{key}}:{{value}}  {% endif %}

                  {% if key == 'id' %}                 {% assign id                 = value %} {% endif %}
                  {% if key == 'enabled' %}            {% assign enabled            = value %} {% endif %}
                  {% if key == 'background_color_1' %} {% assign background_color_1 = value %} {% endif %}
                  {% if key == 'background_color_2' %} {% assign background_color_2 = value %} {% endif %}
                {% endfor %}
            {% endfor %}

            {% if id and enabled %}
            {% comment %} Add CSS styles for current banner to section <HEAD>
            -------------------------------------------------------------------- {% endcomment %}
            {% if background_color_1 and background_color_2 %}
            var banner_backround_style = '';
            // Initialze banner background gradient/colors
            banner_backround_style += "<style> .{{id}}-background { ";
            banner_backround_style += "background-image: -webkit-gradient(linear, left top, left bottom, from( " +j1.setColorData('{{background_color_1}}')+ " ), to(  " +j1.setColorData('{{background_color_2}}')+ " ));";
            banner_backround_style += "background-image: -webkit-linear-gradient(top, " +j1.setColorData('{{background_color_1}}')+ " 0%, " +j1.setColorData('{{background_color_2}}')+ " 100%);";
            banner_backround_style += "background-image: -o-linear-gradient(top, " +j1.setColorData('{{background_color_1}}')+ " 0%, " +j1.setColorData('{{background_color_2}}')+ " 100%);";
            banner_backround_style += "background-image: linear-gradient(to bottom, " +j1.setColorData('{{background_color_1}}')+ " 0%, " +j1.setColorData('{{background_color_2}}')+ " 100%);";
            banner_backround_style += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="' +j1.setColorData('{{background_color_1}}')+ '", endColorstr="' +j1.setColorData('{{background_color_2}}')+ '", GradientType=0); ';
            banner_backround_style += "} </style>";
            $('head').append( banner_backround_style );
            {% endif %}

            {% comment %} Register current banner
            -------------------------------------------------------------------- {% endcomment %}
            banner.push('{{id}}');
            {% endif %}

          {% endfor %}  {% comment %} END banners {% endcomment %}

          {% comment %} Reset (Liquid) element variables
          ---------------------------------------------------------------------- {% endcomment %}
          {% assign id                  = nil %}
          {% assign enabled             = nil %}
          {% assign background_color_1  = nil %}
          {% assign background_color_2  = nil %}
          {% assign banner_config       = nil %}

        {% endfor %}  {% comment %} END banner_config {% endcomment %}
      {% endfor %}  {% comment %} END banner_config_settings {% endcomment %}

      {% comment %} REGISTER exceptions container
      -------------------------------------------------------------------------- {% endcomment %}
      banner.push('exception_container');

      {% comment %} LOAD all banner registered
      -------------------------------------------------------------------------- {% endcomment %}
      if ( banner.length ) {
        for (var i in banner) {
          var id = '#' + banner[i];
          var selector = $(id);
          if (selector.length) {
            logText = 'loading banner on id: ' +banner[i];
            logger.info(logText);
            var banner_data_path = '{{banner_data_path}} ' + id + ' > *';
            selector.load( banner_data_path, cb_load_closure( id ) );
          }
        }
      }  else {
        logText = 'no banner found in site';
        logger.info(logText);
      }

      return true;
    }, // END initBanner

    // -------------------------------------------------------------------------
    // initPanel
    // AJAX fetcher to load and place all panel used for a page
    // -------------------------------------------------------------------------
    // ToDo:
    initPanel: function ( options ) {
      var logger  = log4javascript.getLogger('j1.initPanel');
      var panel   = [];
      var mod     = 'j1';

      {% comment %} Closure to pass additional data (e.g. panel_id) to AJAX load callback
      See: http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
      -------------------------------------------------------------------------- {% endcomment %}
      var cb_load_closure = function(panel_id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt == 'success' ) {
            logText = 'loading panel completed on id: ' +panel_id;
            logger.info(logText);
          }
          if ( statusTxt == 'error' ) {
            logText = 'loading panel failed on id: ' +panel_id+ ', error ' + xhr.status + ': ' + xhr.statusText;
            logger.error(logText);
            // Set|Log status
            state = 'Error';
            logger.error('state: ' + state);
          }
        };
      };

      {% comment %} Collect all panel id|s configured
      -------------------------------------------------------------------------- {% endcomment %}
      {% for items in panel_config_settings %}
        {% assign key   = items[0] %}
        {% assign value = items[1] %}

        {% if key == 'intro'     %}  {% assign panel_config  = value %} {% endif %}
        {% if key == 'service'   %}  {% assign panel_config  = value %} {% endif %}
        {% if key == 'step'      %}  {% assign panel_config  = value %} {% endif %}
        {% if key == 'news'      %}  {% assign panel_config  = value %} {% endif %}
        {% if key == 'exception' %}  {% assign panel_config  = value %} {% endif %}

        {% for items in panel_config %}
          {% for panels in items %}

            {% for panel in panels %}
                {% for item in panel %}
                  {% assign key = item[0] %}
                  {% assign value = item[1] %}

                  {% if key and debug %} item:value  {{key}}:{{value}}  {% endif %}

                  {% if key == 'id' %}                 {% assign id                 = value %} {% endif %}
                  {% if key == 'enabled' %}            {% assign enabled            = value %} {% endif %}
                {% endfor %}
            {% endfor %}

      {% comment %} Register current panel
      -------------------------------------------------------------------------- {% endcomment %}
      {% if id and enabled %}
      panel.push('{{id}}');
      {% endif %}

      {% comment %} Reset (Liquid) element variables
      -------------------------------------------------------------------------- {% endcomment %}
      {% assign id           = nil %}
      {% assign enabled      = nil %}
      {% assign panel_config = nil %}

          {% endfor %}  {% comment %} END panels {% endcomment %}
        {% endfor %}  {% comment %} END panel_config {% endcomment %}
      {% endfor %}  {% comment %} END panel_config_settings {% endcomment %}

      if ( panel.length ) {
        for (var i in panel) {
          var id = "#" + panel[i];
          var selector = $(id);
          if ( selector.length ) {
            logText = 'loading panel on id: ' +panel[i];
            logger.info(logText);
            var panel_data_path = '{{panel_data_path}} ' + id + ' > *';
            selector.load( panel_data_path, cb_load_closure( id ) );
          }
        }
      } else {
        logText = 'no panel found in site';
        logger.info(logText);
      }

      return true;
    }, // END initPanel

    // -------------------------------------------------------------------------
    // initFooter
    // AJAX fetcher to load and place the footer used for a page
    // -------------------------------------------------------------------------
    initFooter: function ( options ) {
      var logger = log4javascript.getLogger('j1.initFooter');
      var mod    = 'j1';

      logText = 'initialization started';
      logger.info(logText);

      var cb_load_closure = function(footer_id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt ==  'success' ) {
            logText = 'footer loaded successfully on id: ' + footer_id;
            logger.info(logText);

            state = 'footer_loaded';
            logger.info('set state for module ' + mod + ': ' + state);
            executeFunctionByName(mod + '.setState', window, state)

            logText = 'initialization finished';
            logger.info(logText);
          }
          if ( statusTxt == 'error' ) {
            logText = 'loading footer failed on id: ' +footer_id+ ', error ' + xhr.status + ': ' + xhr.statusText;
            logger.error(logText);
            // Set|Log status
            state = 'failed';
            logger.error('state: ' + state);
            logText = 'initialization finished';
            logger.info(logText);
          }
        };
      };

      var id = '#' + '{{footer_id}}';
      var selector = $(id);
      if ( selector.length ) {
        var footer_data_path = '{{footer_data_path}}';
        // var footer_data_path = '{{footer_data_path}}' + id + ' > *';
        selector.load( footer_data_path, cb_load_closure( id ) );
      }

      return true;
    }, // END initFooter

    // -------------------------------------------------------------------------
    // initClipboard
    // Create copy-to-clipboard for all pages
    // -------------------------------------------------------------------------
    initClipboard: function ( options ) {
      var logger = log4javascript.getLogger('j1.initClipboard');

      logText = 'initialization started';
      logger.info(logText);

      // insert copy to clipboard button before all elements having a
      // class of ".highlight" assigned to (e.g. Asciidoc source blocks)
      $('.highlight').each(function () {
        // Check if no clipboard should be applied
        var isNoClip = $(this).closest('.noclip');
        if ( isNoClip.length == 0) {
          var btnHtml = '<div class="j1-clipboard"><span class="btn-clipboard j1-tooltip" data-toggle="tooltip" data-placement="left" title="Copy to clipboard">Copy</span></div>';
          var bumms = $(this).closest('.noclip');
          $(this).before(btnHtml);
          $('.btn-clipboard').tooltip();
        }
      });
      var clipboard = new Clipboard( '.btn-clipboard', {
        target: function target(trigger) {
          return trigger.parentNode.nextElementSibling;
        }
      });

      // Manage clipboard events
      clipboard.on('success', function (e) {
        $(e.trigger).attr('title', 'copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
        var logger = log4javascript.getLogger('j1.initClipboard');
        var logText = 'initialization copy-to-clipboard sucessfull';
        logger.debug(logText);
        /* Cleanup clipped data for trailing numbers */
        var splitted = e.text.split('\n');
        var concat;
        var i;
        for (i=0; i<splitted.length; i++) {
          concat += splitted[i].replace(/^\s+\d+/, '');
        }
        e.clearSelection();
      });
      clipboard.on('error', function (e) {
        var fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'press \u2318 to copy' : 'press ctrl-c to copy';
        logger = log4javascript.getLogger('j1.initClipboard');
        logText = 'initialization copy-to-clipboard failed, fallback used.';
        logger.warn(logText);
        $(e.trigger).attr('title', fallbackMsg).tooltip('_fixTitle').tooltip('show').attr('title', 'copy to clipboard').tooltip('_fixTitle');
      });

      logText = 'initialization finished';
      logger.info(logText);

      return true;
    }, // END initClipboard

    // -------------------------------------------------------------------------
    // displayPage
    // Show the page after timeout of {{hideOnReload}} ms
    // -------------------------------------------------------------------------
    // NOTE:
    //  jadams, 2019-08-21: for unknown reason, the user state data
    //  (read from cookie) seems not coorect (or loaded too late).
    //  To make correct data sure for APP mode, a status request is done
    //  to load the current state from the middleware (skipped in WEB mode)
    // -------------------------------------------------------------------------
    displayPage: function (options) {
      var logger              = log4javascript.getLogger('j1.displayPage');
      var flickerTimeout      = {{template_config.flicker_timeout}};
      var url                 = new parseURL(window.location.href)
      var baseUrl             = url.origin;
      var ep_status           = baseUrl + '/status' + '?page=' + window.location.pathname;
      var user_session        = j1.readCookie(cookie_names.user_session);
      var user_state          = j1.readCookie(cookie_names.user_state);
      var current_url         = new parseURL(window.location.href);
      var providerPermissions = {};
      var provider;
      var previous_page;
      var appDetected;
      var categoryAllowed;


      logger.info('finalize page');
      j1.setCss();

      if (j1.appDetected()) {
        // APP mode
        logger.info('mode detected: app');

        $.when ($.ajax(ep_status))
        .then(function(data) {
          var logger = log4javascript.getLogger('j1.displayPage');

          user_session = j1.mergeData(user_session, data);

          user_session.current_page = current_url.pathname;
          j1.writeCookie({
            name:     cookie_names.user_session,
            data:     user_session
          });

          providerPermissions = user_session.provider_permissions;
          categoryAllowed     = providerPermissions.includes(user_session.page_permission);

          // Make sure that protected pages are ALWAYS checked for permissions
          // -------------------------------------------------------------------
          if (
            j1.authEnabled() &&
            user_session.page_permission !== 'public' &&
            categoryAllowed === false)
          {
            // redirect to middleware|page_authentication
            if (data.authenticated === 'true') {
              var ep_post_authentication = baseUrl + '/post_authentication';
              window.location.href = ep_post_authentication;
          } else if (j1.authEnabled()) {
              var ep_page_validation = baseUrl + '/page_validation?page=' + window.location.pathname;
              window.location.href = ep_page_validation;
              return false;
            }
          } // END check protected pages

          setTimeout (function() {
            // Display page
            $('#no_flicker').css('display', 'block');

            // show|hide cookie icon
            if (user_state.cookies_accepted === 'accepted') {
              // show cookie icon
              logText = 'show cookie icon';
              logger.info(logText);
              $('#quickLinksCookieButton').css('display', 'block');
            } else {
              logText = 'hide cookie icon';
              logger.info(logText);
              // hide cookie icon
              $('#quickLinksCookieButton').css('display', 'none');
            }

            // show|hide translator icon
            if (translation_enabled) {
              logger.info('translator detected: google');
              logger.info('initialize language selector');
              $('.goog-te-combo').addClass('form-control');
            }

            // show cc icon
            $('#quickLinksControlCenterButton').css('display', 'block');

            // show|hide signin|out icon
            if (j1.authEnabled()) {
              if (user_session.authenticated === 'true') {
                // set signout
                logger.info('show signout icon');
                $('#navLinkSignInOut').attr("data-target","#modalOmniSignOut");
                $('#iconSignInOut').removeClass( "mdi-login" ).addClass( "mdi-logout" );
              } else {
                // set signin
                logger.info('show signin icon');
                $('#navLinkSignInOut').attr("data-target","#modalOmniSignIn");
                $('#iconSignInOut').removeClass( "mdi-logout" ).addClass( "mdi-login" );
              }
              logger.info('authentication detected as: ' + user_session.authenticated);
              $('#quickLinksSignInOutButton').css('display', 'block');
            }

            // If the page requested contains an anchor element,
            // do a smooth scroll to
            j1.scrollTo();

            if (user_session.previous_page !== user_session.current_page) {
              logText = 'page change detected';
              logger.info(logText);
              logText = 'previous page: ' + user_session.previous_page;
              logger.info(logText);
              logText = 'current page: ' + user_session.current_page;
              logger.info(logText);
            }

            // update sidebar for changed consent|theme data
            logger.info('update sidebar');
            user_state        = j1.readCookie(cookie_names.user_state);
            current_user_data = j1.mergeData(user_session, user_state);
            j1.core.navigator.updateSidebar(current_user_data);

            // Set|Log status
            state = 'finished';
            logText = 'state: ' + state;
            logger.info(logText);
            logText = 'page finalized successfully';
            logger.info(logText);

          }, flickerTimeout);
        });
        // END APP mode
      } else {
        // web mode
        setTimeout (function() {
          // Display page
          $('#no_flicker').css('display', 'block');
            logger.info('mode detected: web');
            logger.info('hide signin icon');
            $('#quickLinksSignInOutButton').css('display', 'none');

            user_session.current_page = current_url.pathname;
            j1.writeCookie({
              name:     cookie_names.user_session,
              data:     user_session
            });

            // show|hide translator icon
            if (translation_enabled) {
              logger.info('translator detected: google');
              logger.info('initialize language selector');
              $('.goog-te-combo').addClass('form-control');
            }

            // show|hide cookie icon
            if (user_state.cookies_accepted === 'accepted') {
              // Display cookie icon
              logText = 'show cookie icon';
              logger.info(logText);
              $('#quickLinksCookieButton').css('display', 'block');
            } else {
              logText = 'hide cookie icon';
              logger.info(logText);
              // Display cookie icon
              $('#quickLinksCookieButton').css('display', 'none');
            }

            // If the page requested contains an anchor element,
            // do a smooth scroll to
            j1.scrollTo();

            if (user_session.previous_page !== user_session.current_page) {
              logText = 'page change detected';
              logger.info(logText);
              logText = 'previous page: ' + user_session.previous_page;
              logger.info(logText);
              logText = 'current page: ' + user_session.current_page;
              logger.info(logText);
            }

            // update sidebar for changed consent|theme data
            logger.info('update sidebar');
            user_state        = j1.readCookie(cookie_names.user_state);
            current_user_data = j1.mergeData(user_session, user_state);
            j1.core.navigator.updateSidebar(current_user_data);

            // Set|Log status
            state = 'finished';
            logText = 'state: ' + state;
            logger.info(logText);
            logText = 'page finalized successfully';
            logger.info(logText);

         }, flickerTimeout);
      } // END WEB mode
    }, // END displayPage

    // -------------------------------------------------------------------------
    // Initialize BS Material Design
    // -------------------------------------------------------------------------
    // ToDo:
    initMDB: function (options) {
      var logger;

      logger  = log4javascript.getLogger('j1.initMDB');
      logText = 'material design is being started';
      logger.info(logText);

      $('body').bootstrapMaterialDesign();
      //new WOW().init();

      var logText = 'initializing material design finished';
      logger.info(logText);
    }, // END initMDB

    // -------------------------------------------------------------------------
    // Helper functions
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    //  Merge two objects (properties) and returns the resulting object
    //  TODO:  Improve comment, give synopsis and example
    // See: https://stackoverflow.com/questions/43109229/merge-default-options-containing-object-with-json-object
    // -------------------------------------------------------------------------
    mergeData: function () {
      var a = [].slice.call(arguments), o = a.shift();

      for(var i=0,l=a.length; i<l; i++){
        for(var p in a[i]){
          o[p] = a[i][p];
        }
      }
      return o;
    },  // END mergeData

    // -------------------------------------------------------------------------
    //  returns the last vistited page
    // -------------------------------------------------------------------------
    getPrevPage: function () {
      return previous_page;
    }, // END getPrevPage

    // -------------------------------------------------------------------------
    //  returns the preferred language taken form window.navigator
    //  See:
    //  https://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
    // -------------------------------------------------------------------------
    getLanguage: function () {
      var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    }, // END getLanguage

    // -------------------------------------------------------------------------
    //  returns the template version taken from site config (_config.yml)
    // -------------------------------------------------------------------------
    getTemplateVersion: function () {
      return '{{template_version}}';
    }, // END getTemplateVersion

    // -------------------------------------------------------------------------
    // Scrolls smooth to any anchor referenced by an page URL on
    // e.g. a page reload. Values for delay|offset are taken from
    // TOCCER module
    // -------------------------------------------------------------------------
    scrollTo: function () {
      var anchor    = window.location.href.split("#")[1];
      var anchor_id = '#' + anchor;
      var selector;

      if (anchor_id) {
        // scroll only, if an anchor is given with URL
        selector = $(anchor_id);
        if (selector.length) {
          j1.core.scrollSmooth.scroll( anchor_id, {
            duration: {{toccer_options.scrollSmoothDuration}},
            offset: {{toccer_options.scrollSmoothOffset}},
            callback: null
          });
        } else {
          // scroll the page one pixel back and forth (trigger)
          // to get the right position for the Toccer and adjust the
          // Navigator to display the (tranparent) navbar correctly
          //
          $(window).scrollTop($(window).scrollTop()+1);
          $(window).scrollTop($(window).scrollTop()-1);
        } // END if anchor_id
      }
    }, // END scrollTo

    // -------------------------------------------------------------------------
    //  authEnabled:
    //  Returns the state of the authentication module
    // -------------------------------------------------------------------------
    authEnabled: function () {
      var logger = log4javascript.getLogger('j1.authentication');
      var authEnabled = {{authentication_options.j1_auth.enabled}}

      return authEnabled;
    }, // END authEnabled

    // -------------------------------------------------------------------------
    //  appDetected:
    //  Returns true if a web session cookie exists
    // -------------------------------------------------------------------------
    appDetected: function () {
      var user_session;
      var cookieExists = j1.existsCookie(cookie_names.user_session);
      var detected = false;

      if (cookieExists) {
        user_session = j1.readCookie(cookie_names.user_session);
        detected     = user_session.mode === 'app' ? true : false;
      } else {
        // detected = 'unknown';
        detected = false;
      }
      return detected;
    }, // END appDetected

    // -------------------------------------------------------------------------
    // xhrData:
    // Load data asychronously using XHR on a DIV container
    // specified (from options: xhr_data_path)
    // -------------------------------------------------------------------------
    xhrData: function (mod, options, status) {
      var logger  = log4javascript.getLogger('j1.xhrData');
      var state   = status;
      var logText;

      var cb_load_closure = function(mod, id) {
        return function (responseTxt, statusTxt, xhr) {
          if ( statusTxt === 'success' ) {
            if (state) {
              logger.info('set state for ' +mod+ ' to: ' + state);
              executeFunctionByName(mod + '.setState', window, state);
            }
            logText = 'data loaded successfully on id: ' +id;
            logger.info(logText);
          }
          if ( statusTxt === 'error' ) {
            state = 'failed';
            logger.info('set state for ' +mod+ ' to: ' + state);
            executeFunctionByName(mod + '.setState', window, state);
            logText = 'loading data failed on id: ' +id+ ', error ' + xhr.status + ': ' + xhr.statusText;
            logger.error(logText);
          }
        };
      };

      var id = "#" + options.xhr_container_id;
      var selector = $(id);

      if ( selector.length ) {
        var modal_html_data_path = options.xhr_data_path + " > *";
        selector.load( modal_html_data_path, cb_load_closure( mod, id ) );
        return true;
      } else {
        logText = "data not loaded"
        logger.warn(logText);
        // Set processing state to 'finished' to complete module load
        state = 'finished';
        logger.info('state: ' + state);
        executeFunctionByName(mod + '.setState', window, state)
        return false;
      }
    }, // END xhrData

    // -------------------------------------------------------------------------
    //  xhrApi: XMLHttpRequest (XHR) based async server API request
    //  Request an REST API at 'url', using verb 'type' of response type 'type'
    // -------------------------------------------------------------------------
    xhrApi: function (url, request_type, data_type) {
      var logger    = log4javascript.getLogger('j1.xhrApi');
      var type      = typeof request_type == 'undefined' || request_type == '' ? 'GET'  : request_type;
      var data_type = typeof data_type == 'undefined' || data_type == '' ? 'json' : data_type;

      return $.ajax({
        url:      url,
        type:     type,
        dataType: data_type,
        success:  function(data) {
          if (typeof data == 'string') {
            return JSON.parse(data);
          }
          if (typeof data == 'object') {
            return data;
          }
        },
        error: function(error) {
          logger.error('xhr request failed: ' + error.statusText);
        }
      });

    }, // END xhrApi

    // -------------------------------------------------------------------------
    //  fetchAPI: Fetch (Promise) based async request
    //  Returns the current git state collected from /git endpoint
    // -------------------------------------------------------------------------
    fetchAPI: function (params, cbData) {
      var logger    = log4javascript.getLogger('j1.fetchAPI');
      var cbData      = cbData;
      var parameters  = params == '' ? 'all' : params;
      var url         = 'http://localhost:41001/gut';

      async function callAPI() {
        const URL         = url;
        const fetchResult = fetch(URL)
        const response    = await fetchResult;

        if (response.ok) {
          const jsonData  = await response.json();
          json_data       = JSON.stringify(jsonData, undefined, 2);
          logText         = 'response from fetch received: ' + json_data;
          logger.info(logText);
          //console.log(jsonData);
        } else {
          throw Error(response.statusText);
          // logger.error("Fetch request failed: " + response.statusText);
        }
      }
      callAPI();

      return true;
    }, // END fetchAPI

    // -------------------------------------------------------------------------
    // getRuntimeData: Returns the j1_runtime data object
    //
    // -------------------------------------------------------------------------
    getRuntimeData: function (data_path) {
    var logger = log4javascript.getLogger('j1.getRuntimeData');
    var logText;

    return $.ajax({
        url:      data_path,
        success:  function (contents) {
          logText = 'data loaded successfully';
          logger.info(logText);
          state = 'runtime_data_loaded_success';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state);
        },
        error: function (err) {
          logText = 'runtime data not loaded: ' + err;
          logger.warn(logText);
          state = 'runtime_data_loaded_failed';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state)
          return false;
        }
      });

    }, // END getRuntimeData

    // -------------------------------------------------------------------------
    // getColorData: Returns the j1_colors object
    // Load color definitions from colors_data_path
    // -------------------------------------------------------------------------
    getColorData: function (data_path) {
      var logger    = log4javascript.getLogger('j1.getColorData');
      var j1_colors = {};

      return $.ajax({
        url:      data_path,
        success:  function (data) {
          var logText = "color data loaded successfully"
          logger.info(logText);
          state = 'color_data_loaded_success';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state);

          if (typeof data == 'string') {
            j1_colors = JSON.parse(data);
          }
          if (typeof data == 'object') {
            j1_colors = data;
          }
        },
        error: function (data) {
          var logText = "color data not loaded"
          logger.warn(logText);
          state = 'color_data_loaded_failed';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state)
          return false;
        }
      });

    }, // END getColorData

    // -------------------------------------------------------------------------
    // setColorData:
    //
    // -------------------------------------------------------------------------
    setColorData: function (color) {

      if ( typeof color != 'undefined' ) {
        var reHex = /^#[A-Fa-f0-9]+$/;
        var reRGBA = /^rgba/;
        var isHex = color.match(reHex);
        var isRGBA = color.match(reRGBA);

        if ( typeof j1.colors[color] != 'undefined' ) {
          return j1.colors[color];
        } else if (isHex) {
          return color;
        } else if (isRGBA) {
          return color;
        } else {
          return false;
        }
      } else {
        return false;
      }

    }, // END setColorData

    // -------------------------------------------------------------------------
    // getFontSizeData: Returns the j1_font_sizes object
    // Load loadFontSize definitions from font_size_data_path
    // -------------------------------------------------------------------------
    getFontSizeData: function (data_path) {
      var logger        = log4javascript.getLogger('j1.getFontSizeData');
      var j1_font_sizes = {};

      return $.ajax({
        url:      data_path,
        success:  function (data) {
          var logText = "font size data loaded successfully"
          logger.info(logText);
          state = 'fontsize_data_loaded_success';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state);

          if (typeof data == 'string') {
            j1_font_sizes = JSON.parse(data);
          }
          if (typeof data == 'object') {
            j1_font_sizes = data;
          }
        },
        error: function (data) {
          var logText = "font size data not loaded"
          logger.warn(logText);
          state = 'fontsize_data_loaded_failed';
          logger.info('state: ' + state);
          executeFunctionByName('j1.setState', window, state)
          return false;
        }
      });

    }, // END getFontSizeData

    // -------------------------------------------------------------------------
    // getFontSize: Returns the CSS value for a 'logical' fontsize
    // out of the j1_font_sizes object
    // -------------------------------------------------------------------------
    setFontSize: function (size) {

      if ( typeof size != 'undefined' ) {
        var reCSS = /\bpx\b|\brem\b|\bem\b|\%|\binherit\b|\binitial\b|\bunset\b/;
        var isCSS = size.match(reCSS);

//      if ( typeof j1_font_sizes[size] != "undefined" ) {
        if ( typeof j1.fonts[size] != "undefined" ) {
            return j1.fonts[size];
        } else if (isCSS) {
          return size;
        } else {
          return false;
        }
      } else {
        return false;
      }

    }, // END getFontSize

    // -------------------------------------------------------------------------
    // loadMessageCatalog
    // Loads the message catalog object
    // -------------------------------------------------------------------------
    getMessageCatalog: function (data_path /*, request_type, data_type*/) {
      var logger          = log4javascript.getLogger('j1.loadMessageCatalog');
      var message_catalog = {};
      var type            = typeof request_type == 'undefined' || request_type  == '' ? 'GET'  : request_type;
      var data_type       = typeof data_type    == 'undefined' || data_type     == '' ? 'text' : data_type;
      var messageData;
      var logBase;
      var logText;
      var property;

      return $.ajax({
        url:      data_path,
        type:     type,
        dataType: data_type,
        success:  function (data) {
          messageData = yaml.safeLoad(data);
          for (property in messageData) {
            if (messageData.hasOwnProperty(property)) {
              message_catalog[property] = {};
              messageData[property].forEach((element) => {
                var key   = Object.keys(element)[0];
                var value = element[Object.keys(element)[0]];
                message_catalog[property][key] = value;
              });
            }
          }
          j1.messages = message_catalog;
          logBase = message_catalog.info.getData.message
          logText = logBase.text + logBase.message_catalog + logBase.finished;
          logger.info(logText);
        },
        error: function(data) {
          var json_data = JSON.stringify(data, undefined, 2);
          logBase       = message_catalog.error.getData.message;
          logText       = logBase.text + logBase.xhr + ': ' + json_data
          logger.error(logText);
        }
      });

    }, // END getMessageCatalog

    // -------------------------------------------------------------------------
    //  readCookie:
    //
    // -------------------------------------------------------------------------
    readCookie: function (name) {
      var data;
      var data_json;
      var cookieExists = j1.existsCookie(name);

      if (cookieExists) {
        data_json = window.atob(Cookies.get(name));
        data      = JSON.parse(data_json);

        if (data) {
          return data;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }, // END readCookie

    // -------------------------------------------------------------------------
    // writeCookie:
    // Write 'data' to a cookie 'name'. If not exists, the cookie gets
    // created. Returns 'true' if cookie was written, otherwise 'false'.
    //
    writeCookie: function (options /*name, data, [path, expires, secure]*/) {
      var defaults = {
          name: '',
          data: {},
          path: '/',
          expires: 0,
          secure: false
      };
      var settings = $.extend(defaults, options);

      var epoch         = Math.floor(Date.now()/1000);
      var timestamp     = moment.unix(epoch).format('YYYY-MM-DD hh:mm:ss');
      var cookie_data   = {};
      var data_json;
      var data_encoded;

      if (j1.existsCookie(settings.name)) {
        cookie_data   = j1.readCookie(settings.name);
        cookie_data.timestamp = timestamp;
        cookie_data   = j1.mergeData(cookie_data, settings.data);
        data_json     = JSON.stringify( cookie_data );
        data_encoded  = window.btoa(data_json);
        if (settings.expires > 0) {
          Cookies.set(settings.name, data_encoded, { expires: settings.expires });
        } else {
          Cookies.set(settings.name, data_encoded);
        }
      } else {
        cookie_data   = settings.data
        data_json     = JSON.stringify( settings.data );
        data_encoded  = window.btoa(data_json);
        if (settings.expires > 0) {
          Cookies.set(settings.name, data_encoded, { expires: settings.expires });
        } else {
          Cookies.set(settings.name, data_encoded);
        }
      }

      if (j1.existsCookie(settings.name)) {
        return cookie_data;
      } else {
        return false;
      }

    }, // END writeCookie

    // -------------------------------------------------------------------------
    // Clears all given cookies by name (except cookies set to httpOnly).
    // For all cookies the expire date is set in the past, those cookies
    // are 'session' cookies. All session cookies are deleted (automatically)
    // by the browser if the last session (browser window) is closed.
    // See: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
    // -------------------------------------------------------------------------
    removeCookie: function (options /*name [, path]*/) {
      var cookieExists;
      var defaults = {
          name: '',
          path: '/'
      };
      var settings = $.extend(defaults, options);

      Cookies.remove(settings.name, { path: settings.path });

    }, // END removeCookie

    // -------------------------------------------------------------------------
    // Clears all given cookies by name (except cookies set to httpOnly).
    // For all cookies the expire date is set in the past, those cookies
    // are 'session' cookies. All session cookies are deleted (automatically)
    // by the browser if the last session (browser window) is closed.
    // See: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
    // -------------------------------------------------------------------------
    deleteCookie: function (options) {
      var name        = options;
      var all_cookies = document.cookie.split("; ");

      if ( name === 'all' ) {
        for (var c = 0; c < all_cookies.length; c++) {
          var d = window.location.hostname.split(".");
          while (d.length > 0) {
            var cookieBase = encodeURIComponent(all_cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
              document.cookie = cookieBase + p.join('/');
              p.pop();
            };
            d.shift();
          }
        }
      } else {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      return true;
    }, // END deleteCookie

    // -------------------------------------------------------------------------
    //  returns true if a given cookie exists
    // -------------------------------------------------------------------------
    existsCookie: function (name) {
      var dc            = document.cookie;
      var prefix        = name + "=";
      var begin         = dc.indexOf("; " + prefix);
      var end           = dc.length; // default to end of the string
      var cookieExists  = false;
      var cookieContent = '';

      // found, and not in first position
      if (begin !== -1) {
        // exclude the "; "
        begin += 2;
      } else {
        //see if cookie is in first position
        begin = dc.indexOf(prefix);
        // not found at all or found as a portion of another cookie name
        if (begin === -1 || begin !== 0 ) return false;
      }

      // if ";" is found somewhere after the prefix position then "end" is
      // that position, otherwise it defaults to the end of the string
      if (dc.indexOf(";", begin) !== -1) {
        end = dc.indexOf(";", begin);
      }

      cookieContent = decodeURI(dc.substring(begin + prefix.length, end) ).replace(/"/g, '');
      cookieExists  = cookieContent.length ? true : false;

      return cookieExists;
    }, // END existsCookie

    // -------------------------------------------------------------------------
    // Resolve MACROs
    //
    // See:
    //  https://stackoverflow.com/questions/5376431/wildcards-in-jquery-selectors
    //  https://stackoverflow.com/questions/16400072/jquery-each-only-affects-last-element
    //  https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
    //  https://stackoverflow.com/questions/179713/how-to-change-the-href-for-a-hyperlink-using-jquery
    //  https://stackoverflow.com/questions/5223/length-of-a-javascript-object
    // -------------------------------------------------------------------------
    resolveMacros: function (user_data) {
      var logger = log4javascript.getLogger('j1.resolveMacros');

      if (Object.keys(user_data).length) {
        $('[id^=macro-]').each(function() {

          $('#macro-provider').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??provider', user_data.provider));
            this.href = this.href.replace(/.*\/??provider-site-url/, user_data.provider_site_url);
          });
          $('#macro-user-name').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??user-name', user_data.user_name));
            this.href = this.href.replace(/.*\/??provider_member_url/, user_data.provider_member_url);
          });
          $('#macro-provider-permissions').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??provider-permissions', user_data.provider_permissions));
            this.href = this.href.replace(/.*\/??provider_member_url/, user_data.provider_member_url);
          });
          $('#macro-provider-membership').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??provider-membership', user_data.provider_membership));
            this.href = this.href.replace(/.*\/??provider_member_url/, user_data.provider_member_url);
          });
          $('#macro-cookie-state').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??cookie-state', user_data.cookies_accepted));
            this.href = this.href.replace(/.*\/??provider_privacy_url/, user_data.provider_privacy_url);
          });
          $('#macro-theme-name').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??theme-name', user_data.theme_name));
          });
          $('#macro-theme-author').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??theme-author', user_data.theme_author));
            this.href = this.href.replace(/.*\/??theme-author-url/, user_data.theme_author_url);
          });
          $('#macro-theme-version').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace('??theme-version', user_data.theme_version));
          });

        });
        return true;
      } else {
        logger.error('no user data provided');
        return false;
      }

    }, // END resolveMacros

    // -------------------------------------------------------------------------
    // Update MACROs
    // Update the values, NOT the placeholders
    // -------------------------------------------------------------------------
    updateMacros: function (user_data) {
      var logger = log4javascript.getLogger('j1.updateMacros');

      if (Object.keys(user_data).length) {
        $('[id^=macro-]').each(function() {

          $('#macro-provider').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace(/Provider:.*/, 'Provider: ' + user_data.provider));
            $('#macro-provider').attr("href", user_data.provider_site_url);
          });
          $('#macro-user-name').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace(/User:.*/, 'User: ' + user_data.user_name));
            $('#macro-user-name').attr("href", user_data.provider_member_url);
          });
          $('#macro-provider-permissions').each(function() {
            var $this = $(this);
            var $html = $this.html();
            // $this.html($html.replace(/public|protected|private|blocked/, user_data.provider_permissions));
            $this.html($html.replace(/public.*|protected.*|private.*|blocked.*/, user_data.provider_permissions));
            $('#macro-provider-permissions').attr("href", user_data.provider_member_url);
          });
          $('#macro-provider-membership').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace(/guest|member/, user_data.provider_membership));
            $('#macro-provider-membership').attr("href", user_data.provider_member_url);
          });
          $('#macro-cookie-state').each(function() {
            var $this = $(this);
            var $html = $this.html();
            $this.html($html.replace(/accepted|declined|pending/, user_data.cookies_accepted));
            $('#macro-cookie-state').attr("href", user_data.provider_privacy_url);
          });

        });
        return true;
      } else {
        logger.error('no user data provided');
        return false;
      }

    }, // END updateMacros

    // -------------------------------------------------------------------------
    // getMessage
    // Get a log message from the log message catalog object
    // -------------------------------------------------------------------------
    getMessage: function (level, message, property) {
      var message = j1.messages[level][message]["message"][property];

      return message;
    }, // END getMessage

    // -------------------------------------------------------------------------
    // logger
    // Log a message
    // -------------------------------------------------------------------------
    logger: function (logger, level, message) {
      var logger = log4javascript.getLogger(logger);

      logger[level](message);

      return true;
    }, // END logger

    // -------------------------------------------------------------------------
    // getBaseUrl
    // -------------------------------------------------------------------------
    // getBaseUrl: function () {
    //   var myUrl = window.location.href;
    //   var ua    = platform.name.toLowerCase();
    //   var reURL = new RegExp('(http[s]?:\/\/)?([^\/]+)(.*)');
    //   var baseUrl;
    //   //var reGroups;
    //
    //   // NOTE: named capture groups NOT supported by FF + IE11
    //   // if ( ua === 'chrome' ) {
    //   //   reURL     = new RegExp('(?<prot>http[s]?:\/\/)?(?<host>[^\/]+)(?<path>.*)');
    //   //   reGroups  = myUrl.match(reURL).groups;
    //   //   baseUrl  = reGroups.prot + reGroups.host;
    //   // } else {
    //   //   reURL     = new RegExp('(http[s]?:\/\/)?([^\/]+)(.*)');
    //   //   myUrl.match(reURL);
    //   //   baseUrl  = RegExp.$1 + RegExp.$2 + RegExp.$3;
    //   // }
    //
    //   myUrl.match(reURL);
    //   // baseUrl = RegExp.$1 + RegExp.$2 + RegExp.$3;
    //   baseUrl = RegExp.$1 + RegExp.$2;
    //
    //   return baseUrl;
    // }, // END getBaseUrl

    // -------------------------------------------------------------------------
    // getPath
    // See: https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
    // -------------------------------------------------------------------------
    // getPath: function ( myUrl ) {
    //   var url = new parseURL(myUrl)
    //   // var reURL = new RegExp('(http[s]?:\/\/)?([^\/]+)(.*)');
    //   // var path;
    //   //
    //   // myUrl.match(reURL);
    //   path  = url.path;
    //
    //   return path;
    // }, // END getPath

    // -------------------------------------------------------------------------
    // Send message
    // -------------------------------------------------------------------------
    sendMessage: function ( sender, receiver, message ) {
      var logger        = log4javascript.getLogger('j1.sendMessage');
      // var json_message  = JSON.stringify(message, undefined, 2);             // multiline
      var json_message  = JSON.stringify(message);

      if ( receiver === 'j1' ) {
        logText = 'send message from ' + sender + ' to' + receiver + ': ' + json_message;
        logger.debug(logText);
        executeFunctionByName('j1' + '.messageHandler', window, sender, message)
      } else {
        logText = 'send message from ' + sender + ' to ' + receiver + ': ' + json_message;
        logger.debug(logText);
        //executeFunctionByName('j1.' + receiver + '.messageHandler', window, sender, message)
        executeFunctionByName(receiver + '.messageHandler', window, sender, message)
      }

    }, // END sendMessage

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function ( sender, message ) {
      // var json_message  = JSON.stringify(message, undefined, 2);             // multiline
      var json_message  = JSON.stringify(message);

      logText = 'received message from ' + sender + ': ' + json_message;
      logger.debug(logText);

      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      if ( message.type === 'command' && message.action === 'module_initialized' ) {
        _this.setState('finished');
        logger.info(message.text);
      }

      //
      // Place handling of other command|action here
      //

      return true;
    }, // END messageHandler

    // -------------------------------------------------------------------------
    // getStyleValue:
    // returns the value of a style from a css class definition
    // example: j1.getStyleValue('bg-primary', 'background-color')
    getStyleValue: function (className, style) {
      var elementId = 'test-' + className,
        testElement = document.getElementById(elementId),
        val;

      if (testElement === null) {
        testElement = document.createElement('div');
        testElement.className = className;
        testElement.style.display = 'none';
        document.body.appendChild(testElement);
      }
      val = $(testElement).css(style);
      document.body.removeChild(testElement);

      return val;
    }, // END getStyleValue

    // -------------------------------------------------------------------------
    //  Returns the names of cookies used for J1 Template
    // -------------------------------------------------------------------------
    getCookieNames: function () {
      return cookie_names;
    }, // end getCookieNames

    // -------------------------------------------------------------------------
    // Set dynamic styles
    // -------------------------------------------------------------------------
    setCss: function () {
      var logger     = log4javascript.getLogger('j1.setCss');
      var bg_primary = j1.getStyleValue('bg-primary', 'background-color');

      logger.info('set color scheme for selected theme');

      // globals
      // -----------------------------------------------------------------------
      $('head').append('<style>.g-bg-primary { background-color: ' +bg_primary+ ' !important; }</style>');

      // mdi icons
      // -----------------------------------------------------------------------
      $('head').append('<style>.iconify-md-bg-primary { color: ' +bg_primary+ ' !important; }</style>');
      $('head').append('<style>.fa-md-bg-primary { color: ' +bg_primary+ ' !important; }</style>');
      $('head').append('<style>.fas-md-bg-primary { color: ' +bg_primary+ ' !important; }</style>');
      $('head').append('<style>.mdi-md-bg-primary { color: ' +bg_primary+ ' !important; }</style>');

      // asciidoc
      // -----------------------------------------------------------------------
      var admonitionblock_note_color      = bg_primary;
      var admonitionblock_tip_color       = j1.getStyleValue('btn-success', 'background-color');
      var admonitionblock_important_color = j1.getStyleValue('btn-warning', 'background-color');
      var admonitionblock_warning_color   = j1.getStyleValue('icon-warning', 'color');
      var admonitionblock_caution_color   = j1.getStyleValue('btn-danger', 'background-color');

      $('head').append('<style>.icon-note { color: ' +bg_primary+ ' !important; }</style>');
      $('head').append('<style>.icon-tip { color: ' +admonitionblock_tip_color+ ' !important; }</style>');
      $('head').append('<style>.icon-important { color: ' +admonitionblock_important_color+ ' !important; }</style>');
      $('head').append('<style>.icon-warning { color: ' +admonitionblock_warning_color+ ' !important; }</style>');
      $('head').append('<style>.icon-caution { color: ' +admonitionblock_caution_color+ ' !important; }</style>');

      // bs base styles
      // -----------------------------------------------------------------------
      $('head').append('<style>code { color: ' +bg_primary+ ' !important; }</style>');

      // bs tool tips
      // -----------------------------------------------------------------------
      $('head').append('<style>.tooltip-inner { background-color: ' +bg_primary+ ' !important; }</style>');

      // asciidoc results viewer
      // -----------------------------------------------------------------------
      $('head').append('<style>.btn-viewer:hover { background-color: ' +bg_primary+ ' !important; }</style>');

      // clipboard
      // -----------------------------------------------------------------------
      $('head').append('<style>.btn-clipboard:hover { background-color: ' +bg_primary+ ' !important; }</style>');

      // extended modals
      // -----------------------------------------------------------------------
      var tabs_pills_link_color_active    = j1.setColorData('md_blue');         // j1.getStyleValue('btn-info', 'background-color');
      var tabs_pills_link_color_hover     = j1.setColorData('md_gray_300');     // j1.getStyleValue('btn-secondary', 'background-color');

      // nav module
      // -----------------------------------------------------------------------
      $('head').append('<style>.nav-link:hover { background-color: ' +tabs_pills_link_color_hover+ ' !important; }</style>');
      $('head').append('<style>.nav-link.active { background-color: ' +tabs_pills_link_color_active+ ' !important; }</style>');

      return true;
    }, // END setCss

    // -------------------------------------------------------------------------
    //  Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      state= stat;
      //j1.state stat;
    }, // end setState

    // -------------------------------------------------------------------------
    //  Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      // return j1.state;
      return state;
    }, // end getState

    // -------------------------------------------------------------------------
    //  Set the current mode of the site (web|app)
    // -------------------------------------------------------------------------
    setMode: function (mod) {
      mode = mod;
    }, // END setMode

    // -------------------------------------------------------------------------
    //  Return the current mode of the site (web|app)
    // -------------------------------------------------------------------------
    getMode: function () {
      return mode;
    }, // END getMode

    // -------------------------------------------------------------------------
    // getUserAgent
    //  Return the name of the web browser
    // -------------------------------------------------------------------------
    checkUserAgent: function (ua_name) {
      if (navigator.userAgent.search(ua_name) >= 0) {
        return true;
      } else {
        return false;
      }
    }, // END checkUserAgent

    // -------------------------------------------------------------------------
    //  Return always true (for testing purposes)
    // -------------------------------------------------------------------------
    getTrue: function () {
      return true;
    }, // END isTrue

    // -------------------------------------------------------------------------
    //  Return always false (for testing purposes)
    // -------------------------------------------------------------------------
    getFalse: function () {
      return false;
    }, // END isTrue

    // -------------------------------------------------------------------------
    //  Return users to their browser homepage
    // -------------------------------------------------------------------------
    goHome: function () {
      // most browsers
      if (typeof window.home == 'function') {
        window.home();
      } else if (document.all) {
        // for IE
        window.location.href = "about:home";
      } else {
        window.location.href = "about:blank";
      }
    } // END gohome

  } // END j1 (return)
}) (j1, window);

{% endcapture %}

{{ cache | strip_empty_lines }}
{% assign cache = nil %}
