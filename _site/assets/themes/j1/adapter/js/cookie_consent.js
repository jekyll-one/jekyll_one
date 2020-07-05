
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/cookie_consent.js
 # JS Adapter for J1 Cookie Consent module
 #
 # Product/Info:
 # http://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Cookie Consent is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2020-07-04 19:51:31 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['cookie_consent'] = (function (j1, window) {
  // ---------------------------------------------------------------------------
  // globals loader
  // ---------------------------------------------------------------------------
  var cookie_consent = {
    'cookies_accepted': 'pending'
  };
  var environment               = 'production';
  var cookie_names              = j1.getCookieNames();
  var user_state_name           = cookie_names.user_state;
  var user_state_exists         = j1.existsCookie(user_state_name);
  var moduleOptions             = {};
  var user_session              = {};
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // module initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // initialize state flag
      j1.adapter.cookie_consent.state = 'pending';
      // -----------------------------------------------------------------------
      // defaults loader
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.cookie_consent',
        generated:   '2020-07-04 19:51:31 +0200'
      }, options);
      _this             = j1.adapter.cookie_consent;
      logger            = log4javascript.getLogger('j1.adapter.cookie_consent');
      // TODO:
      //    CHECK how|what module should initialize the user_state
      //    cookie. For now disabled here, because cookie is too early
      //    written. Cause corrupted|imcomplete cookie content if cookie
      //    does NOT exists already.
      // cookie_consent    = j1.existsCookie(user_state_name) ?
      //                       j1.readCookie(user_state_name) :
      //                       j1.writeCookie({
      //                         name:     user_state_name,
      //                         data:     cookie_consent,
      //                         expires:  365
      //                       });
      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      moduleOptions = $.extend({}, {"enabled":true, "xhr_container_id":"cookie_consent_modals", "xhr_data_path":"/assets/data/cookie_consent/index.html", "modal_type":"full", "modal_position":"top", "stop_scrolling":true, "consent_modal_id":"cookie_consent_modals", "consent_modals_title":"Privacy", "whitelisted_pages":["/", "/pages/public/about/site/", "/pages/public/about/become_a_patron/ /pages/public/legal/en/impress/", "/pages/public/legal/en/privacy/", "/pages/public/legal/en/license_agreement/"], "categories":{"enabled":true, "category_title":"Cookie usage by category", "category_description":"Usage Information", "category_description_text":"By category, cookies may used for content pages if marked by <i class=\"fa md-green fa-check ml-1\"></i>", "category_session":"Session Cookies", "category_persistent":"Persistent Cookies", "category_first_party":"First-party Cookies", "category_second_party":"Second-party Cookies"}, "buttons":{"policy_button":true, "policy_button_text":"Cookie Policy", "accept_button":true, "accept_button_text":"Yes, I accept cookies", "decline_button":true, "decline_button_text":"No, I refuse cookies"}, "strict":false, "show_consent_icon":true, "show_consent_on_pending":false, "delete_cookies_on_decline":false, "policy_about":"This website uses cookies to ensure vistors get the best experience on our content, presented user-friendly, more effective and safer.\n", "cookie_policy_title":"Cookie Policy", "cookie_policy_tagline":"Based on EU legislation on cookies. See http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32009L0136:EN:NOT[Directive 2009/136/EC, window=\"_blank\"] (ePrivacy Directive), https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R1725[Regulation (EU) 2018/1725, window=\"_blank\"] (Data protection) for more details\n", "cookie_policy_text":"The operators of this website take protection of your personal data extremely seriously. We treat your personal data as confidential and comply with the data protection legislation and this privacy policy.\n\nA cookie is a commonly used automated data collection tool. Cookies are small text files that are placed on your computer or device by websites that you visit in order to make websites work, or work more efficiently.\n\nNOTE: If you do not wish to receive cookies you may be able to refuse them by adjusting your browser settings to reject cookies. If you do so, we may be unable to offer you some of our functionalities, services or support. If you have previously visited our websites, you may also have to delete any existing cookies from your browser.\n\nWe, may our partners, make use of cookies, web beacons, pixel tags, scripts or other similar technologies on our websites to improve the browsing experience of our pages. We use different kinds of cookies.\n\nCookies are classified by its *lifespan* and the *domain* to which it belongs.\n\nSession Cookie:: Classified by *lifespan*. Necessary to provide you with services and features available through our websites. Without these cookies, services you may need, such as shopping carts or e-billing, cannot be provided.\n\nPersistent Cookie:: Classified by *lifespan*. Necessary to provide you with services and features available through our websites. Without these cookies, services you may need, such as shopping carts or e-billing, cannot be provided.\n\nFirst-party Cookie:: Classified by the *domain*. Collect information that is either used in aggregate form to help us understand how the website is being used or how effective our marketing campaigns are, or to help us customize the website for you.\n\nSecond-party Cookie:: Classified by the *domain*. Used to make advertising messages more relevant to you.\n"});
      if (typeof options !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
      if (moduleOptions.enabled) {
        _this.setState('started');
        logger.info('state: ' + _this.getState());
        logger.info('module is being initialized');
        if (j1.existsCookie(user_state_name)) {
          cookie_consent                      = j1.readCookie(user_state_name);
          cookie_consent.deleteOnDecline      = moduleOptions.delete_cookies_on_decline;
          cookie_consent.showConsentOnPending = moduleOptions.show_consent_on_pending;
          cookie_consent.whitelistedPages     = moduleOptions.whitelisted_pages;
          cookie_consent.stopScrolling        = moduleOptions.stop_scrolling;
          // Update cookie consent
          // TODO: MAKE expiery date configurable
          // j1.writeCookie({
          //   name:    user_state_name,
          //   data:    cookie_consent,
          //   expires: cookie_consent.live_span
          // });
          j1.writeCookie({
            name:    user_state_name,
            data:    cookie_consent,
            expires: 365
          });
        }
        // ---------------------------------------------------------------------
        // data loader
        // ---------------------------------------------------------------------
        logger.info('loading html data for modals');
        $.when (j1.xhrData('j1.adapter.cookie_consent', moduleOptions, 'data_loaded'))
        .then (function (success) {
          if (success) {
            logger.info('loading data completed');
            // -----------------------------------------------------------------
            // core initializer
            // -----------------------------------------------------------------
            var dependencies_met_cookie_consent_core = setInterval(function() {
              if (_this.getState() == 'data_loaded') {
                _this.setState('processing');
                j1.core.cookie_consent.init ({
                  deleteOnDecline:      moduleOptions.delete_on_decline,
                  showConsentOnPending: moduleOptions.show_consent_on_pending,
                  whitelistedPages:     moduleOptions.whitelisted_pages,
                  stopScrolling:        moduleOptions.stop_scrolling,
                  policyButton:         moduleOptions.buttons['policy_button'],
                  acceptButton:         moduleOptions.buttons['accept_button'],
                  declineButton:        moduleOptions.buttons['decline_button']
                });
                _this.setState('initialized');
                logger.info('state: ' + _this.getState());
                logger.info('core module initialized');
                clearInterval(dependencies_met_cookie_consent_core);
              }
            }, 25);
            // -----------------------------------------------------------------
            // event handler
            // -----------------------------------------------------------------
            var dependencies_events = setInterval(function() {
              if (_this.getState() == 'initialized') {
                _this.setState('processing');
                j1.core.cookie_consent.eventHandler(cookie_consent);
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                clearInterval(dependencies_events);
              }
            }, 25);
          } else {
            _this.setState('finished');
            logger.info('state: ' + _this.getState());
            logger.warn('loading data failed');
          }
        });
      } else {
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.warn('module disabled');
      }
      return true;
    }, // END init
    // -------------------------------------------------------------------------
    // messageHandler:
    // Manage messages send from other modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);
      logText = 'received message from ' + sender + ': ' + json_message;
      logger.info(logText);
      // -----------------------------------------------------------------------
      //  Process commands if send as a message
      // -----------------------------------------------------------------------
      if (message.type === 'command' && message.action === 'state_final') {
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
      j1.adapter.cookie_consent.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    //  Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.cookie_consent.state;
    } // END state
  }; // END return
})(j1, window);


