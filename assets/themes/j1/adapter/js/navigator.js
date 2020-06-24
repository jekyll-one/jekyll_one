---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/navigator.js
 # Liquid template to adapt Navigator Core functions
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
 # NOTE:
 #
 # JSON pretty print
 # Example: var str = JSON.stringify(obj, null, 2); // spacing level = 2
 # See: https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
 # -----------------------------------------------------------------------------
 # NOTE:
 #  jadams, 2020-06-21:
 #    J1 Navigator needs a general revision on BS4 code and functionalities
 #    Current, only base function are tested with BS4 (was coded for BS3)
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}
{% capture select_color %}themes/{{site.template.name}}/procedures/global/select_color.proc{% endcapture %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment                   = site.environment %}
{% assign brand_image_height            = site.brand.image_height %}


{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
{% assign auth_manager_config           = site.j1_auth %}
-------------------------------------------------------------------------------- {% endcomment %}
{% assign site_config                   = site %}
{% assign template_config               = site.data.template_settings %}
{% assign blocks                        = site.data.blocks %}
{% assign modules                       = site.data.modules %}

{% assign authentication_defaults       = modules.defaults.authentication.defaults %}
{% assign authentication_settings       = modules.authentication.settings %}

{% assign template_config               = site.data.template_settings %}
{% assign navigator_defaults            = site.data.modules.defaults.navigator.defaults %}
{% assign navigator_settings            = site.data.modules.navigator.settings %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign nav_bar_defaults              = navigator_defaults.nav_bar %}
{% assign nav_bar_settings              = navigator_settings.nav_bar %}
{% assign nav_menu_defaults             = navigator_defaults.nav_menu %}
{% assign nav_menu_settings             = navigator_settings.nav_menu %}

{% assign nav_quicklinks_defaults       = navigator_defaults.nav_quicklinks %}
{% assign nav_quicklinks_settings       = navigator_settings.nav_quicklinks %}
{% assign nav_topsearch_defaults        = navigator_defaults.nav_topsearch %}
{% assign nav_topsearch_settings        = navigator_settings.nav_topsearch %}
{% assign nav_authclient_defaults       = authentication_defaults.auth_client %}
{% assign nav_authclient_settings       = authentication_settings.auth_client %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign authentication_options        = authentication_defaults | merge: authentication_settings %}
{% assign nav_bar_options               = nav_bar_defaults | merge: nav_bar_settings %}
{% assign nav_menu_options              = nav_menu_defaults | merge: nav_menu_settings %}
{% assign quicklinks_options            = nav_quicklinks_defaults | merge: nav_quicklinks_settings %}
{% assign topsearch_options             = nav_topsearch_defaults | merge: nav_topsearch_settings %}
{% assign authclient_options            = nav_authclient_defaults | merge: nav_authclient_settings %}

{% assign nav_bar_id                    = navigator_defaults.nav_bar.id %}
{% assign nav_menu_id                   = navigator_defaults.nav_menu.id %}
{% assign nav_quicklinks_id             = navigator_defaults.nav_quicklinks.id %}
{% assign nav_navbar_media_breakpoint   = navigator_defaults.nav_bar.media_breakpoint %}
{% assign authclient_modals_id          = navigator_defaults.nav_authclient.xhr_container_id %}

{% if nav_bar_options.dropdown_animate_duration != null %}
 {% assign animate_duration             = nav_bar_options.dropdown_animate_duration %}
{% else %}
 {% assign animate_duration             = 1 %}
{% endif %}

{% comment %}
--------------------------------------------------------------------------------
Set|Overload Liquid vars hardwired to NOT break the (MD) style
ToDo: Remove configuration from j1_navigator.yml
-------------------------------------------------------------------------------- {% endcomment %}
{% assign dropdown_border_height        = "3" %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/navigator.js
 # JS Adapter for J1 Navigator
 #
 # Product/Info:
 # {{site.data.template_settings.theme_author_url}}
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see {{site.data.template_settings.theme_author_url}}
 # -----------------------------------------------------------------------------
 # NOTE: For AJAX (XHR) loads see
 #  https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done
 # -----------------------------------------------------------------------------
 # NOTE: For getStyleValue helper see
 #  https://stackoverflow.com/questions/16965515/how-to-get-a-style-attribute-from-a-css-class-by-javascript-jquery
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

j1.adapter['navigator'] = (function (j1, window) {

  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment                 = '{{environment}}';
  var dclFinished                 = false;
  var moduleOptions               = {};

  var nav_menu_id                 = '{{nav_menu_id}}';
  var nav_quicklinks_id           = '{{nav_quicklinks_id}}';
  var authclient_modals_id        = '{{authclient_modals_id}}';

  var colors_data_path            = '{{template_config.colors_data_path}}';
  var font_size_data_path         = '{{template_config.font_size_data_path}}';
  var nav_menu_data_path          = '{{nav_menu_options.data_path}}';
  var nav_quicklinks_data_path    = '{{quicklinks_options.data_path}}';
  var authclient_modals_data_path = '{{authclient_options.xhr_data_path}}';

  var cookie_names                = j1.getCookieNames();
  var cookie_user_session_name    = cookie_names.user_session;

  var user_session                = {};
  var user_session_merged         = {};
  var session_state               = {};

  var j1_colors                   = {};
  var j1_font_sizes               = {};

  var authClientEnabled;
  var appDetected;
  var json_data;
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
      // initialize state flag
      j1.adapter.navigator.state = 'pending';

      // -----------------------------------------------------------------------
      // defaults
      // -----------------------------------------------------------------------
      var settings  = $.extend({
        module_name: 'j1.adapter.navigator',
        generated:   '{{site.time}}'
      }, options);
      _this         = j1.adapter.navigator;
      logger        = log4javascript.getLogger('j1.adapter.navigator');

      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      var authConfig                                = {};
      var navDefaults                               = {};
      var navBarConfig                              = {};
      var navMenuConfig                             = {};
      var navQuicklinksConfig                       = {};
      var navTopsearchConfig                        = {};
      var navAuthClientConfig                       = {};
      var navBarOptions                             = {};
      var navMenuOptions                            = {};
      var navQuicklinksOptions                      = {};
      var navTopsearchOptions                       = {};
      var navAuthClientOptions                      = {};
      var navAuthMAnagerConfig                      = {};

      navDefaults                                   = $.extend({}, {{navigator_defaults | replace: '=>', ':' }});
      navBarConfig                                  = $.extend({}, {{nav_bar_options | replace: '=>', ':' }});
      navMenuConfig                                 = $.extend({}, {{nav_menu_options | replace: '=>', ':' }});
      navQuicklinksConfig                           = $.extend({}, {{quicklinks_options | replace: '=>', ':' }});
      navTopsearchConfig                            = $.extend({}, {{topsearch_options | replace: '=>', ':' }});
      navAuthClientConfig                           = $.extend({}, {{authclient_options | replace: '=>', ':' }});

      navAuthMAnagerConfig                          = $.extend({}, {{authentication_options | replace: '=>', ':' }});
      authClientEnabled                             = navAuthMAnagerConfig.enabled;


      // Merge|Overload module CONFIG by DEFAULTS
      //
      navBarOptions                                 = j1.mergeData(navBarConfig, navDefaults.nav_bar);
      navMenuOptions                                = j1.mergeData(navMenuConfig, navDefaults.nav_menu);
      navQuicklinksOptions                          = j1.mergeData(navQuicklinksConfig, navDefaults.nav_quicklinks);
      navTopsearchOptions                           = j1.mergeData(navTopsearchConfig, navDefaults.nav_topsearch);
      navAuthClientConfig                           = j1.mergeData(navAuthClientConfig, navDefaults.nav_authclient);

      // save config settings into the navigator object for global access
      //
      j1.adapter.navigator['navDefaults']           = navDefaults;
      j1.adapter.navigator['navBarOptions']         = navBarOptions;
      j1.adapter.navigator['navMenuOptions']        = navMenuOptions;
      j1.adapter.navigator['navQuicklinksOptions']  = navQuicklinksOptions;
      j1.adapter.navigator['navTopsearchOptions']   = navTopsearchOptions;
      j1.adapter.navigator['navAuthClientConfig']   = navAuthClientConfig;
      j1.adapter.navigator['navAuthManagerConfig']  = navAuthMAnagerConfig;

      // Load (individual) frontmatter options (currently NOT used)
      if (options  != null) { var frontmatterOptions = $.extend({}, options) }

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      // -----------------------------------------------------------------------
      // data loader
      // -----------------------------------------------------------------------
      logger.info('run deferred data load');
      $.when (
        j1.xhrData ( // quicklinks
          'j1.adapter.navigator', {
          xhr_container_id: navQuicklinksOptions.xhr_container_id,
          xhr_data_path:    navQuicklinksOptions.xhr_data_path },
          null),
        j1.xhrData ( // authclient
          'j1.adapter.navigator', {
          xhr_container_id: navAuthClientConfig.xhr_container_id,
          xhr_data_path:    navAuthClientConfig.xhr_data_path },
          null),
        j1.xhrData ( // menubar
          'j1.adapter.navigator', {
          xhr_container_id: navMenuOptions.xhr_container_id,
          xhr_data_path:    navMenuOptions.xhr_data_path },
          'data_loaded'))
      .done (function (quickLinks, authclient, menuBar) {
        // ---------------------------------------------------------------------
        // core initializer
        // ---------------------------------------------------------------------
        var dependencies_met_navigator_core = setInterval (function () {
          if (_this.getState() === 'data_loaded') {
            _this.setState('processing');

            logger.info('status: ' + _this.getState());
            logger.info('initialize navigator core');

            // Detect|Set J1 App status
            appDetected       = j1.appDetected();
            authClientEnabled = j1.authEnabled();
            logger.info('application status detected: ' + appDetected);

            var dependencies_met_nav_menu = setInterval (function() {
              if (typeof j1.colors !== 'undefined') {
                j1.core.navigator.init (
                  _this.navDefaults,
                  _this.navMenuOptions
                );

                // initialize theme switcher menu
                $('#ThemeList').bootstrapThemeSwitcher({localFeed: ''});        // load themes from Bootswatch API
                $('#ThemeSelect').bootstrapThemeSwitcher();                     // Load (local) J1 themes
                logText = 'theme switcher menu loaded successfully';
                logger.info(logText);
                _this.setState('initialized');
                clearInterval(dependencies_met_nav_menu);
              }
            }, 25); // END 'core initialized'

            // -----------------------------------------------------------------
            // event handler + css styles
            // NOTE: jadams, 2019-08-22:
            //  Add to dependcy to themer to fix
            //  missing color setting for menu bar background
            // -----------------------------------------------------------------
            var dependencies_met_events_css = setInterval(function() {
              if (_this.getState() === 'initialized' && j1.adapter.themer.getState() === 'finished') {
                _this.setState('processing');

                logger.info('initialize events and styles');
                j1.core.navigator.eventHandler();

                // set general|global module colors
                logger.info('apply styles');
                _this.setCSS (
                  navBarOptions, navMenuOptions,
                  navQuicklinksOptions, navTopsearchOptions
                );

                logger.info('init auth client');
                j1.adapter.navigator.initAuthClient(j1.adapter.navigator.navAuthManagerConfig);
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                clearInterval(dependencies_met_events_css);
              }
            }, 25); // END 'core initialized'
            clearInterval(dependencies_met_navigator_core);
          }
        }, 25); // END 'dependencies_met_navigator_core'

        // --------------------------------------------------------------------
        // Register event 'reset on resize' to call j1.core.navigator on
        // manageDropdownMenu to manage the (current) NAV menu for
        // desktop or mobile
        // ---------------------------------------------------------------------
        $(window).on('resize', function() {
          j1.core.navigator.manageDropdownMenu(navDefaults, navMenuOptions);

          // Hide|Close topSearch on resize event
          $('.top-search').slideUp();

          // Manage sticky NAV bars
          setTimeout (function(){
            j1.core.navigator.navbarSticky();
          }, 500);

          // jadams, 2020-06-21: unclear|forgotten what I'm doing here!
          // Looks like the old BS3 implementation
          //
          // $('.navbar-collapse').removeClass('in');
          // $('.navbar-collapse').removeClass('on');
          // $('.navbar-collapse').removeClass('bounceIn');
        });

        return true;
      }); // END 'core initializer'
    }, // END init

    // -------------------------------------------------------------------------
    // Initialize JS portion for the dialogs (modals) used by J1AuthClient
    // NOTE: Currently cookie updates NOT processed at the NAV module
    //       All updates on Cookies are managed by Cookie Consent.
    //       To be considered to re-add cookie updates for the auth state
    // -------------------------------------------------------------------------
    initAuthClient: function(auth_config) {
      var logger        = log4javascript.getLogger('j1.adapter.navigator.initAuthClient');
      var user_session  = j1.readCookie(cookie_user_session_name);

      _this.modalEventHandler(auth_config);

      if (j1.appDetected() && j1.authEnabled()) {
        // Toggle/Set SignIn/SignOut icon|link in QuickLinks
        // See: https://stackoverflow.com/questions/13524107/how-to-set-data-attributes-in-html-elements
        if (user_session.authenticated === 'true') {
          // Set SignOut
          $('#navLinkSignInOut').attr('data-target', '#modalOmniSignOut');
          $('#iconSignInOut').removeClass('mdi-login').addClass('mdi-logout');
        } else {
          // Set SignIn
          $('#navLinkSignInOut').attr('data-target', '#modalOmniSignIn');
          $('#iconSignInOut').removeClass('mdi-logout').addClass('mdi-login');
        }
      }

      return true;
    }, // END initAuthClient

    // -------------------------------------------------------------------------
    // modalEventHandler
    // Manage button click events for all BS Modals
    // See: https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
    // -------------------------------------------------------------------------
    modalEventHandler: function (options) {
      // var logger      = log4javascript.getLogger("j1.adapter.navigator.EventHandler");
      var authConfig  = options.j1_auth;
      var route;
      var provider;
      var provider_url;
      var allowed_users;
      var logText;

      var signIn = {
        provider:         authConfig.providers.activated[0],
        users:            authConfig.providers[authConfig.providers["activated"][0]]["users"],
        do:               false
      }

      var signOut = {
        provider:         authConfig.providers.activated[0],
        providerSignOut:  false,
        do:               false
      }

      logText = "initialize button click events";
      logger.info(logText);

      // Manage button click events for modal "signInOutButton"
      // -----------------------------------------------------------------------
      $('ul.nav-pills > li').click(function (e) {
        e.preventDefault();
        // jadams, 2019-07-30: To be checked if needed
        signIn.provider       = $(this).text().trim();
        signIn.provider       = signIn.provider.toLowerCase();
        signIn.allowed_users  = signIn.users.toString();
      });

      $("a.btn").click(function() {
        if (this.id === "signInButton") {
          signIn.do = true;
        } else {
          signIn.do = false;
        }
        if (this.id === "signOutButton") {
          signOut.do = true;
        } else {
          signOut.do = false;
        }
      });

      $('input:checkbox[name="providerSignOut"]').on('click', function (e) {
        e.stopPropagation();
        signOut.providerSignOut = $('input:checkbox[name="providerSignOut"]').is(":checked");
        if(environment == "development") {
          logText = "provider signout set to: " + signOut.providerSignOut;
          logger.info(logText);
        }
      });

      // Manage pre events on modal "modalOmniSignIn"
      // -----------------------------------------------------------------------
      $("#modalOmniSignOut").on('show.bs.modal', function() {
          var modal = $(this);
          logger.info('place current user data');
          user_session = j1.readCookie(cookie_user_session_name);
          modal.find('.user-info').text('You are signed in to provider: ' + user_session.provider);
      }); // END SHOW modalOmniSignOut

      // Manage post events on modal "modalOmniSignIn"
      // -----------------------------------------------------------------------
      $("#modalOmniSignIn").on('hidden.bs.modal', function() {
        if (signIn.do == true) {
          provider      = signIn.provider.toLowerCase();
          allowed_users = signIn.users.toString();
          logText       = 'provider detected: ' + provider;
          logger.info(logText);

          var route = '/authentication?request=signin&provider=' +provider+ '&allowed_users=' +allowed_users;
          logText = 'call middleware for signin on route: ' + route;
          logger.info(logText);
          window.location.href = route;
        } else {
          provider = signIn.provider.toLowerCase();
          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'login declined for provider: ' +provider;
          logger.info(logText);
        }
      }); // END post events "modalOmniSignIn"

      // Manage post events on modal "modalOmniSignOut"
      // -----------------------------------------------------------------------
      $("#modalOmniSignOut").on('hidden.bs.modal', function() {
        if (signOut.do == true) {
          logger.info('load active provider from cookie: ' + cookie_user_session_name);

          user_session    = j1.readCookie(cookie_user_session_name);
          provider      = user_session.provider;
          provider_url  = user_session.provider_site_url;

          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'initiate signout for provider: ' +provider;
          logger.info(logText);

          var route = '/authentication?request=signout&provider=' + provider + '&provider_signout=' + signOut.providerSignOut; // + '/logout/';
          logText = 'call middleware on route : ' +route;
          logger.info(logText);
          window.location.href = route;
        } else {
          provider = signOut.provider.toLowerCase();
          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'signout declined for provider: ' +provider ;
          logger.info(logText);
        }
      }); // END post events "modalSignOut"

      logText = "initialize button click events completed";
      logger.info(logText);

      return true;
    }, // END modalEventHandler

    // -------------------------------------------------------------------------
    // setCSS
    // Set dynamic CSS styles
    // -------------------------------------------------------------------------
    setCSS: function (navBarOptions, navMenuOptions, navQuicklinksOptions, navTopsearchOptions) {
      var logger              = log4javascript.getLogger("j1.adapter.navigator.setCSS");
      var gridBreakpoint_lg   = '992px';
      var gridBreakpoint_md   = '768px';
      var gridBreakpoint_sm   = '576px';

      {% comment %} Resolve symbolic font sizes
      -------------------------------------------------------------------------- {% endcomment %}

      {% comment %} Set|Resolve navMenuOptions
      -------------------------------------------------------------------------- {% endcomment %}
      navMenuOptions.dropdown_font_size               = j1.setFontSize(navMenuOptions.dropdown_font_size);
      navMenuOptions.megamenu_font_size               = j1.setFontSize(navMenuOptions.megamenu_font_size);


      {% comment %} Resolve symbolic color names
      -------------------------------------------------------------------------- {% endcomment %}

      {% comment %} Set|Resolve navBarOptions
      -------------------------------------------------------------------------- {% endcomment %}
      navBarOptions.background_color_full             = j1.setColorData(navBarOptions.background_color_full);
//    navBarOptions.background_color_collapsed        = j1.setColorData(navBarOptions.background_color_collapsed);
//    navBarOptions.background_color_scrolled         = j1.setColorData(navBarOptions.background_color_scrolled);

      {% comment %} Set|Resolve navMenuOptions
      -------------------------------------------------------------------------- {% endcomment %}
      navMenuOptions.menu_item_color                  = j1.setColorData(navMenuOptions.menu_item_color);
      navMenuOptions.menu_item_color_hover            = j1.setColorData(navMenuOptions.menu_item_color_hover);
      navMenuOptions.menu_item_dropdown_color         = j1.setColorData(navMenuOptions.menu_item_dropdown_color);
      navMenuOptions.dropdown_item_color              = j1.setColorData(navMenuOptions.dropdown_item_color);
      navMenuOptions.dropdown_background_color_hover  = j1.setColorData(navMenuOptions.dropdown_background_color_hover);
      navMenuOptions.dropdown_background_color_active = j1.setColorData(navMenuOptions.dropdown_background_color_active);
      navMenuOptions.dropdown_border_color            = j1.setColorData(navMenuOptions.dropdown_border_color);

      {% comment %} Set|Resolve navQuicklinksOptions
      -------------------------------------------------------------------------- {% endcomment %}
      navQuicklinksOptions.icon_color                 = j1.setColorData(navQuicklinksOptions.icon_color);
      navQuicklinksOptions.icon_color_hover           = j1.setColorData(navQuicklinksOptions.icon_color_hover);
      navQuicklinksOptions.background_color           = j1.setColorData(navQuicklinksOptions.background_color);

      {% comment %} Set|Resolve navTopsearchOptions
      -------------------------------------------------------------------------- {% endcomment %}
      navTopsearchOptions.input_color                 = j1.setColorData(navTopsearchOptions.input_color);
      navTopsearchOptions.background_color            = j1.setColorData(navTopsearchOptions.background_color);


      {% comment %} Set dymanic styles
      -------------------------------------------------------------------------- {% endcomment %}

      {% comment %} navBar styles
      -------------------------------------------------------------------------- {% endcomment %}
      var bg_primary    = j1.getStyleValue('bg-primary', 'background-color');
      var bg_scrolled   = bg_primary
      var bg_collapsed  = bg_primary;

      $('head').append('<style>.mdi-bg-primary {color: ' +bg_scrolled+ ';}</style>');

      // Size of brand image
      $('head').append("<style>.navbar-brand > img { height: {{brand_image_height}}px !important; }</style>");
      // Navbar transparent-light (light)
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator.navbar-transparent.light { background-color: " +navBarOptions.background_color_full+ " !important; border-bottom: solid 0px !important; } }</style>");

//    $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator.navbar-scrolled.light { background-color: " +navBarOptions.background_color_scrolled+ " !important; } }</style>");
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator.navbar-scrolled.light { background-color: " +bg_scrolled+ " !important; } }</style>");

      // Menubar collapsed (mobile)
      $('head').append('<style>.navbar-collapse.collapse.show { background-color: ' +bg_scrolled+ ' !important; }</style>');


      /* Navbar media-queries, LARGE Window|Desktop (>= 1024) */
      /* jadams:  Oversized menu bar fixed by: overflow: hidden */
//    $('head').append("<style>@media (max-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator { background-color: " +navBarOptions.background_color_collapsed+ " !important; overflow: hidden; } }</style>");
      $('head').append("<style>@media (max-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator { background-color: " +bg_collapsed+ " !important; overflow: hidden; } }</style>");
      //$('head').append("<style>@media (max-width: 1023px) { row { margin-left: 0 !important; margin-right: 0 !important; } }</style>");

      {% comment %} navQuicklinks styles
      -------------------------------------------------------------------------- {% endcomment %}
      $('head').append("<style>.attr-nav> ul > li > a { color: " +navQuicklinksOptions.icon_color+ " !important; }</style>");
      $('head').append("<style>.attr-nav> ul > li > a:hover { color: " +navQuicklinksOptions.icon_color_hover+ " !important; }</style>");

      {% comment %} navMenu styles
      -------------------------------------------------------------------------- {% endcomment %}

      // TODO: Check if this style is needed for  MENU item (hover)
      //$('head').append("<style>nav.navbar.navbar-transparent ul.nav > li > a:hover,nav.navbar.no-background ul.nav > li > a:hover,nav.navbar ul.nav li.scroll.active > a,nav.navbar.navbar-dark ul.nav li.dropdown ul.dropdown-menu  > li > a:hover,nav.navbar ul.nav li.dropdown.on > a,nav.navbar-dark ul.nav li.dropdown.on > a { color: " +navMenuOptions.menu_item_color_hover+ " !important; }</style>");
      //
      //$('head').append("<style>.dropdown-menu > .active > a { background-color: " +navMenuOptions.dropdown_background_color_active+ " !important; }</style>");
      // Remove background for anchor
      $('head').append("<style>.dropdown-menu > .active > a { background-color: transparent !important; }</style>");
      // hover menu-item|menu-sub-item
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator .dropdown-item:focus, nav.navbar.navigator .dropdown-item:hover, nav.navbar.navigator .nav-sub-item:focus, nav.navbar.navigator .nav-sub-item:hover { background: " +navMenuOptions.dropdown_background_color_hover+ " !important;  } }</style>");
      // $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu > li a:hover { color: " +navMenuOptions.menu_item_color_hover+ " !important; background: " +navMenuOptions.dropdown_background_color_hover+ " !important; } }</style>");

      // 1st dropdown, limit height
      // TODO: overflow needs to be managed correctly (not static)
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu  { max-height: " +navMenuOptions.dropdown_menu_height_max+ "em; overflow: hidden } }</style>");

      //  Limit dropdown item width
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator ul.nav.navbar-right .dropdown-menu .dropdown-menu { left: -" +navMenuOptions.dropdown_item_width+ "em !important; } }</style>");

      // Limit last (2nd) dropdown in height (nav.navbar.navigator li.dropdown ul.dropdown-menu ul.dropdown-menu)
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu ul.dropdown-menu  { top: -" +navMenuOptions.dropdown_border_top+ "px !important; max-height: " +navMenuOptions.dropdown_menu_height_max+ "em !important; } }</style>");

      //  Set dropdown item colors
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator ul.nav > li > a { color: " +navMenuOptions.menu_item_color+ " !important; } }</style>");
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator ul.nav > li > a:hover { color: " +navMenuOptions.menu_item_color_hover+ " !important; } }</style>");

      // Dropdown menu styles
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu { animation-duration: " +navMenuOptions.dropdown_animate_duration+ "s !important; color: " +navMenuOptions.dropdown_border_color+ "; width: " +navMenuOptions.dropdown_item_width+ "px; border-top: solid " +navMenuOptions.dropdown_border_height+ "px; left: 1rem; top: calc(90px + " +navMenuOptions.dropdown_border_height+ "px); } }</style>");
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu { animation-duration: " +navMenuOptions.dropdown_animate_duration+ "s !important; color: " +navMenuOptions.dropdown_border_color+ "; width: " +navMenuOptions.dropdown_item_width+ "em; border-top: solid " +navMenuOptions.dropdown_border_height+ "px; left: 1em; } }</style>");
      // jadams, 2017-11-30: removed left padding from dropdown mwenu (for new j1nav style based on Navigator|Slate)
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu { animation-duration: " +navMenuOptions.dropdown_animate_duration+ "s !important; color: " +bg_scrolled+ " !important; width: " +navMenuOptions.dropdown_item_width+ "emm!important; border-top: solid " +navMenuOptions.dropdown_border_top+ "px !important; border-radius: " +navMenuOptions.dropdown_border_radius+ "px !important; left: 0; } }</style>");

      {% if dropdown_style == 'raised' %}
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu { box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2) !important; } }</style>");
      {% endif %}

      // jadams,2017-11-22: stop configure dropdown_font_size
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown li.dropdown.nav-item.nav-sub-item { color: " +navMenuOptions.dropdown_item_color+ "; font-size: " +navMenuOptions.dropdown_font_size+ "; font-weight: 400; } }</style>");
      // $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu > li > a { color: " +navMenuOptions.dropdown_item_color+ "; font-size: " +navMenuOptions.dropdown_font_size+ "; font-weight: 400; display: inline-flex; align-items: center;} }</style>");
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu > li > a { color: " +navMenuOptions.dropdown_item_color+ " !important; font-size: " +navMenuOptions.dropdown_font_size+ " !important; font-weight: 400; } }</style>");
      $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator ul.dropdown-menu.megamenu-content .content ul.menu-col li a { color: " +navMenuOptions.dropdown_item_color+ " !important; font-size: " +navMenuOptions.megamenu_font_size+ " !important; font-weight: 400; } }</style>");

      // dropdown-menu item padding
      // jadams, 2017-11-22:  moved item padding to nav|dropdown-item based on font-site (rel|em)
      {% if dropdown_item_style == 'raised' %}
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu > li > a { padding: " +navMenuOptions.dropdown_padding_y+ "px " +navMenuOptions.dropdown_padding_x+ "px; box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); } }</style>");
      {% else %}
      //$('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator li.dropdown ul.dropdown-menu > li > a { padding: " +navMenuOptions.dropdown_padding_y+ "px " +navMenuOptions.dropdown_padding_x+ "px; } }</style>");
      // blödsinn $('head').append("<style>@media (min-width: " +gridBreakpoint_lg+ ") { nav.navbar.navigator .dropdown .nav-item  { padding-top: " +navMenuOptions.dropdown_item_padding+ "px; padding-bottom: " +navMenuOptions.dropdown_item_padding+ "px; } }</style>");
      {% endif %}

      {% comment %} navQuicklinks styles
      -------------------------------------------------------------------------- {% endcomment %}

      {% comment %} navTopSearch Styles
      -------------------------------------------------------------------------- {% endcomment %}
      $('head').append("<style>.top-search { background-color: " +navTopsearchOptions.background_color+ " !important; }</style>");
      $('head').append("<style>.top-search .input-group-addon { color: " +navTopsearchOptions.input_color+ " !important; }</style>");
      $('head').append("<style>.top-search .input.form-control { color: " +navTopsearchOptions.input_color+ " !important; }</style>");

      return true;
    }, // END setCSS

    // -------------------------------------------------------------------------
    //  delayShowMenu
    //  delay all dropdown menu to open for "delay" time
    //  See: http://jsfiddle.net/AndreasPizsa/NzvKC/
    // -------------------------------------------------------------------------
    delayShowMenu: function () {
      var logger      = log4javascript.getLogger("j1.adapter.navigator.delayShowMenu");
      var theTimer    = 0;
      var theElement  = null;

      logText = "entered delayShowMenu"
      logger.info(logText);

      $('#navigator_nav_menu')
        .find('li.dropdown.nav-item')
        .on('mouseenter', function (inEvent) {
          theElement = $(this);
          if (theElement) theElement.removeClass('open');
          //if (theElement) theElement.css("display", "none");
          //window.clearTimeout(theTimer);

          //theTimer = window.setTimeout (function () {
           setTimeout (function () {
            theElement.addClass('open');
            //theElement.css("display", "block");
            //window.clearTimeout(theTimer);
          }, {{menuOpenDelay}});
        })
        .on('mousemove', function (inEvent) {
          if (theElement.hasClass('open')) return true;
          //window.clearTimeout(theTimer);
          //theTimer = window.setTimeout (function () {
           setTimeout (function () {
            theElement.addClass('open');
            //window.clearTimeout(theTimer);
          }, {{menuOpenDelay}});
        })
        .on('mouseleave', function (inEvent) {
          //window.clearTimeout(theTimer);
          theElement = $(this);
          //theTimer = window.setTimeout (function () {
           setTimeout (function () {
            theElement.removeClass('open');
            //window.clearTimeout(theTimer);
          }, {{menuOpenDelay}});
        });

        return true;
    }, // END delayShowMenu

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
      j1.adapter.navigator.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.navigator.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}
