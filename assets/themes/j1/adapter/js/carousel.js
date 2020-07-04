---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/carousel.js
 # Liquid template to adapt J1 Carousel (Owl Carousel V1) Core functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{config | debug}}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment         = site.environment %}
{% assign template_version    = site.version %}
{% assign slider_id           = '' %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config     = site.data.template_settings %}
{% assign apps                = site.data.apps %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign carousel_defaults   = apps.defaults.carousel.defaults %}
{% assign carousel_settings   = apps.carousel.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign carousel_options    = carousel_defaults | merge: carousel_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/carousel.js
 # JS Adapter for J1 Carousel (Owl Carousel V1)
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
--------------------------------------------------------------- {% endcomment %}
j1.adapter['carousel'] = (function (j1, window) {
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
      j1.adapter.carousel.state = 'pending';

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.carousel',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {{carousel_options | replace: '=>', ':' | replace: 'nil', '""'}});

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.carousel;
      logger  = log4javascript.getLogger('j1.adapter.carousel');

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      {% for item in carousel_options.carousel %}

        {% if item.show.enabled %}
          {% assign slider_id     = item.show.id %}
          {% assign slider_title  = item.show.title %}
          {% assign slider_type   = item.show.type %}
          {% assign parallax      = item.show.parallax %}
          {% assign css_classes   = item.show.css_classes %}
          {% assign lazyLoad      = item.show.lightbox %}

          // Create an Carousel INSTANCE if slider on id: {{slider_id}} exists
          if ($('#{{slider_id}}').length) {

            {% if environment == 'development' %}
              logText = 'slider is being initialized on id: #{{slider_id}}';
              logger.info(logText);
              _this.setState('running');
              logger.info('state: ' + _this.getState());
              logger.info('module is being initialized');
            {% endif %}

            {% if item.show.slide_height != null %}
              // Set slide_height: {{item.show.slide_height}}vh
              {% assign slide_height  = item.show.slide_height %}
              $('head').append("<style>.owl-carousel .item{height: {{slide_height}}vh;}</style>");
            {% endif %}

            {% if item.show.slide_space_between %}
              {% assign slide_space = item.show.slide_space_between %}
            {% else %}
              {% assign slide_space = 3 %}
            {% endif %}

            {% if item.show.slide_border %}
              {% assign slide_border = "thumbnail" %}
            {% else %}
              {% assign slide_border = "" %}
            {% endif %}

            // Place HTML markup for the title
            {% if slider_title %}
            var slider_title = '<div class="slider-title">{{slider_title}}</div>';
            $('#{{slider_id}}').before(slider_title);
            {% endif %}

            // place parallax styles
            {% if parallax %}
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{background:url(/assets/images/quotes/default.png) 50% 0 repeat fixed}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{padding:75px 0 75px 25px;position:relative}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{color:#e5e5e5;font-size:1.5rem;font-weight:400}</style>');
              $('head').append('<!-- style>.parallax-slider__owl_demo_text_carousel_parallax{text-align:center}</style -->');
              $('head').append('<!-- style>.parallax-slider__owl_demo_text_carousel_parallax{text-transform:uppercase}</style -->');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax:before{top:0;left:0;width:100%;height:100%;content:" ";position:absolute;background:url(/assets/images/modules/patterns/gridtile.png) repeat;}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax:after{top:0;left:0;width:100%;height:100%;content:" ";position:absolute;background:rgba(0,0,0,0.3)}</style>');
            {% endif %}

            $('head').append("<style>.{{slider_id}}-item{margin: {{slide_space}}px;}</style>");
            //$('.{{slider_id}}-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','{{slide_space}}px');

            // Initialize individual show parameters
            $("#{{slider_id}}").owlCarousel({
              {% for option in item.show.options %}
              {{option[0] | json}}: {{option[1] | json}},
              {% endfor %}
              // Enable lazyLoad if lightbox is enabled
              {% if item.show.lightbox %}
              "lazyLoad": true,
              {% endif %}
              "jsonPath": {{carousel_options.xhr_data_path | json}},
              "jsonSuccess": customDataSuccess_{{forloop.index}}
            });
            // Initialize instance variable (for later access)
            //{{slider_id}} = $('#{{slider_id}}').data('owlCarousel');

            j1["{{slider_id}}"] = $('#{{slider_id}}').data('owlCarousel');

            // jQuery show data functions
            function customDataSuccess_{{forloop.index}}(data){
              var content = "";
              for (var i in data["{{slider_id}}"]) {
                {% if slider_type == 'image' %}
                var lb          = data["{{slider_id}}"][i].lb;
                var lb_caption  = data["{{slider_id}}"][i].lb_caption;
                var img         = data["{{slider_id}}"][i].img;
                var alt         = data["{{slider_id}}"][i].alt;
                {% endif %}
                {% if slider_type == 'text' %}
                var text        = data["{{slider_id}}"][i].text;
                {% endif %}
                var href        = data["{{slider_id}}"][i].href;
                {% if  css_classes %}
                var css_classes = 'class="{{css_classes}}";'
                {% else %}
                var css_classes = ''
                {% endif %}

                {% if slider_type == 'image' %}
                // If lightbox is enabled (preference over href)
                if (lb) {
                  if (lb_caption) {
                    content += '\t\t' + '<div class="item {{slider_id}}-item {{slide_border}}">'+ '\n';
                    content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="{{slider_id}}" data-title="' +lb_caption+ '">' + '\n';
                    content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                    content += '\t\t\t' + '</a>' + '\n';
                    if (href) {
                    content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                    } else {
                    content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                    }
                    content += '\t\t' + '</div>' + '\n';
                  } else {
                    content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="{{slider_id}}"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                  }
                } else if (href) {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                } else {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                }
                {% endif %}

                {% if slider_type == 'text' %}
                if (href) {
                  content += '<div class="item">' + '<p href=' +href+ '">' +text+ '</p>' + '</div>'
                } else {
                  content += '<div class="item">' + '<p>' +text+ '</p>' + '</div>'
                }
                {% endif %}
              }
              $("#{{slider_id}}").html(content);
              logText = 'initializing slider finished on id: {{slider_id}}';
              logger.info(logText);
            } // END customDataSuccess_{{forloop.index}}
          } // END if carousel exists
        {% endif %}
      {% endfor %}

      _this.setState('finished');
      logger.info('state: ' + _this.getState());
      logger.info('initializing module finished');

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
      j1.adapter.carousel.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.carousel.state;
    } // END state

  }; // END return

})(j1, window);

{% endcapture %}
{{cache | strip_empty_lines}}
{% assign cache = nil %}
