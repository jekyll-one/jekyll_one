---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/algolia.js
 # Liquid template to adapt Algolia Core functions
 #
 # Product/Info:
 # https://jekyll.one
 # https://community.algolia.com/instantsearch.js/v2/getting-started.html
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
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
{% assign algolia_config    = site_config.algolia %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/algolia.js
 # J1 Adapter for Algolia
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['algolia'] = (function (j1, window) {

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
      j1.adapter.algolia.state = 'pending';

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.algolia',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.algolia;
      logger  = log4javascript.getLogger('j1.adapter.algolia');

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {{algolia_config | replace: '=>', ':' | replace: 'nil', '""'}});

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      var search = instantsearch({
        appId:      moduleOptions.application_id,
        apiKey:     moduleOptions.search_only_api_key,
        indexName:  moduleOptions.index_name,
        routing:    true
      });

      var hitTemplate = function(hit) {
        // state = 'start search';
        // logger.info('state: ' + state);
        // var re = new RegExp("^\/posts");
        // var re = new RegExp("^\/pages");
        var re = new RegExp("^\/pages|^\/posts|^\/collections");
        if (re.test(hit.url)) {
          let date = '';
          if (hit.date) {
            date = moment.unix(hit.date).format('MMM D, YYYY');
          }
          // let url = `/jekyll-algolia-example${hit.url}#${hit.anchor}`;
          let url = `${hit.url}`;

          const title = hit._highlightResult.title.value;
          let breadcrumbs = '';

          if (hit._highlightResult.headings) {
            breadcrumbs = hit._highlightResult.headings.map(match => {
              return `<span class="post-breadcrumb">${match.value}</span>`
            }).join(' > ')
          }

          var content = hit._highlightResult.html.value;

          return `
            <li class="search-result-item">
              <div class="card card-flat">
                <div class="card-body">
                  <span class="post-meta">${date}</span>
                  <h2 class="card-title">${title}</h2>
                  <h6 class="card-subtitle mb-2 text-muted">${hit.tagline}</h6>
                  <div class="card-text">${content}</div>
                  <div class="card-footer">
                    <a class="card-link" href="${url}" target="_blank">Read more ..</a>
                  </div>
                </div>
              </div>
            </li>
          `;
        }
        // state = 'finished search';
        // logger.info('state: ' + state);
      }

      if (moduleOptions.enabled == true) {
        // initialize currentRefinedValues
        search.addWidget(
          instantsearch.widgets.currentRefinedValues({
            container: '#current-refined-values',
            // This widget can also contain a clear all link to remove all filters,
            // we disable it in this example since we use `clearAll` widget on its own.
            clearAll: false
          })
        );

        // initialize clearAll
        search.addWidget(
          instantsearch.widgets.clearAll({
            container: '#clear-all',
            templates: {
              link: 'Reset TAGS'
            },
            clearsQuery: false,
            autoHideContainer: false
          })
        );

        // initialize pagination
        search.addWidget(
          instantsearch.widgets.pagination({
            container: '#pagination',
            maxPages: 20,
            // default is to scroll to 'body', here we disable this behavior
            scrollTo: false
          })
        );
        // initialize SearchBox
        search.addWidget(
          instantsearch.widgets.searchBox({
            container:            '#search-searchbar',
            placeholder:          'Search this site ..',
            autofocus:            true,
            reset:                true,
            loadingIndicator:     false,
            poweredBy:            true // This is required if you're on the free Community plan
          })
        );
        // initialize hits widget
        search.addWidget(
          instantsearch.widgets.hits({
            container:  '#search-hits',
            templates:  {
              empty:    'No results',
              item:     hitTemplate
            }
          })
        );
        // initialize RefinementList
        search.addWidget(
          instantsearch.widgets.refinementList({
            container:        '#refinement-list',
            attributeName:    'tags',
            collapsible:      true,
            operator:         "and",
            limit:            5,
            sortBy:           ["isRefined","count:desc","name:asc"],
            templates: {
              header:         'Tags'
            },
            showMore:         true
          })
        );
        /*
        search.addWidget(
          instantsearch.widgets.hitsPerPageSelector({
            container: '#hits-per-page-selector',
            items: [
              {value: 3, label: '3 per page', default: true},
              {value: 6, label: '6 per page'},
              {value: 12, label: '12 per page'},
            ]
          })
        );
        */
      }

      if (moduleOptions.enabled == true) {
        search.start();
        $('#searcher').addClass('row');

        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.info('initializing module finished');
      } else {
        $('#algolia-site-search').append('<p class="ml-5 mt-5 mb-5 "> <strong>Algolia Search DISABLED</strong> </p>');
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.warn("module disabled");
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