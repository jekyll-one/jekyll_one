
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
 #  Adapter generated: 2020-07-05 11:53:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['carousel'] = (function (j1, window) {
  var environment   = 'production';
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
        generated:   '2020-07-05 11:53:10 +0200'
      }, options);
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {"enabled":true, "items":5, "itemsCustom":false, "itemsDesktop":[1199, 4], "itemsDesktopSmall":[980, 3], "itemsTablet":[768, 2], "itemsTabletSmall":false, "itemsMobile":[479, 1], "singleItem":false, "itemsScaleUp":false, "slideSpeed":200, "paginationSpeed":800, "rewindSpeed":1000, "autoPlay":false, "stopOnHover":false, "navigation":false, "navigationText":["prev", "next"], "rewindNav":true, "scrollPerPage":false, "pagination":true, "paginationNumbers":false, "responsive":true, "responsiveRefreshRate":200, "responsiveBaseWidth":"window", "baseClass":"owl-carousel", "theme":"owl-theme", "lazyLoad":false, "lazyFollow":true, "lazyEffect":"fade", "autoHeight":false, "xhr_data_path":"/assets/data/carousel.json", "jsonSuccess":false, "dragBeforeAnimFinish":true, "mouseDrag":true, "touchDrag":true, "transitionStyle":false, "beforeUpdate":false, "afterUpdate":false, "beforeInit":false, "afterInit":false, "beforeMove":false, "afterMove":false, "afterAction":false, "startDragging":false, "afterLazyLoad":false, "addClassActive":false, "carousel":[{"show":{"enabled":true, "id":"owl_demo_text_carousel", "lightbox":false, "type":"text", "css_classes":"img-fluid", "text":["<big>Jekyll One Template</big>         </br> <i>Clean, responsive and fully featured Template made for Jekyll</i>", "<big>Jekyll meets Bootstrap</big>      </br> <i>Best of open source and commercial software for the Web</i>", "<big>J1 is Open Source</big>           </br> <i>No pain for private or professional use</i>", "<big>Explore this site</big>           </br> <i>Learn what's possible if you go the Jekyll Way</i>", "<big>Create modern static sites</big>  </br> <i>Secure, powerful and fast<i>"], "options":{"autoPlay":5000, "singleItem":true, "pagination":false}}}, {"show":{"enabled":true, "id":"owl_demo_text_carousel_parallax", "lightbox":false, "type":"text", "parallax":true, "parallax_id":"owl_text_carousel_parallax", "css_classes":"img-fluid", "text":["<big>Jekyll One Template</big>         </br> <i>Clean, responsive and fully featured Template made for Jekyll</i>", "<big>Jekyll meets Bootstrap</big>      </br> <i>Best of open source and commercial software for the Web</i>", "<big>J1 is Open Source</big>           </br> <i>No pain for private or professional use</i>", "<big>Explore this site</big>           </br> <i>Learn what's possible if you go the Jekyll Way</i>", "<big>Create modern static sites</big>  </br> <i>Secure, powerful and fast<i>"], "options":{"autoPlay":5000, "singleItem":true, "pagination":false}}}, {"show":{"enabled":true, "id":"owl_demo_cats", "slide_space_between":3, "slide_border":true, "lightbox":true, "type":"image", "css_classes":"img-fluid", "images_path":"/assets/images/modules/carousel/cats", "images":["cat-1.jpg", "cat-2.jpg", "cat-3.jpg", "cat-4.jpg"], "links":["#", "#", "#", "#"], "lb_caption":["You see cat no 1", "You see cat no 2", "You see cat np 3", "You see cat no 4"], "options":{"navigation":false, "itemsCustom":[[0, 1], [400, 1], [700, 2], [1000, 2], [1200, 2], [1600, 2]], "slideSpeed":300, "paginationSpeed":400, "items":2}}}, {"show":{"enabled":true, "provider":"j1", "id":"owl_demo_simple", "type":"image", "css_classes":"img-fluid", "images_path":"/assets/images/modules/carousel/mega_cities", "images":["andreas-brucker_b.jpg", "denys-nevozhai-1_b.jpg", "denys-nevozhai-2_b.jpg", "luca-bravo_b.jpg", "thomas-tucker_b.jpg"], "links":["#", "#", "#", "#", "#", "#", "#", "#"], "options":{"autoPlay":3000, "items":3, "autoHeight":true, "pagination":false, "paginationNumbers":false, "itemsDesktop":"[1199,3]", "itemsDesktopSmall":"[979,3]"}}}, {"show":{"enabled":true, "provider":"j1", "id":"owl_demo_oneslide", "type":"image", "lightbox":true, "css_classes":"img-fluid", "images_path":"/assets/images/modules/carousel/mega_cities", "images":["andreas-brucker_b.jpg", "denys-nevozhai-1_b.jpg", "denys-nevozhai-2_b.jpg", "luca-bravo_b.jpg", "thomas-tucker_b.jpg"], "options":{"navigation":true, "slideSpeed":300, "paginationSpeed":400, "singleItem":true, "transitionStyle":"goDown"}}}]});
      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
      _this   = j1.adapter.carousel;
      logger  = log4javascript.getLogger('j1.adapter.carousel');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
          // Create an Carousel INSTANCE if slider on id: owl_demo_text_carousel exists
          if ($('#owl_demo_text_carousel').length) {
            // Place HTML markup for the title
            // place parallax styles
            $('head').append("<style>.owl_demo_text_carousel-item{margin: 3px;}</style>");
            //$('.owl_demo_text_carousel-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','3px');
            // Initialize individual show parameters
            $("#owl_demo_text_carousel").owlCarousel({
              "autoPlay": 5000,
              "singleItem": true,
              "pagination": false,
              // Enable lazyLoad if lightbox is enabled
              "jsonPath": "/assets/data/carousel.json",
              "jsonSuccess": customDataSuccess_1
            });
            // Initialize instance variable (for later access)
            //owl_demo_text_carousel = $('#owl_demo_text_carousel').data('owlCarousel');
            j1["owl_demo_text_carousel"] = $('#owl_demo_text_carousel').data('owlCarousel');
            // jQuery show data functions
            function customDataSuccess_1(data){
              var content = "";
              for (var i in data["owl_demo_text_carousel"]) {
                var text        = data["owl_demo_text_carousel"][i].text;
                var href        = data["owl_demo_text_carousel"][i].href;
                var css_classes = 'class="img-fluid";'
                if (href) {
                  content += '<div class="item">' + '<p href=' +href+ '">' +text+ '</p>' + '</div>'
                } else {
                  content += '<div class="item">' + '<p>' +text+ '</p>' + '</div>'
                }
              }
              $("#owl_demo_text_carousel").html(content);
              logText = 'initializing slider finished on id: owl_demo_text_carousel';
              logger.info(logText);
            } // END customDataSuccess_1
          } // END if carousel exists
          // Create an Carousel INSTANCE if slider on id: owl_demo_text_carousel_parallax exists
          if ($('#owl_demo_text_carousel_parallax').length) {
            // Place HTML markup for the title
            // place parallax styles
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{background:url(/assets/images/quotes/default.png) 50% 0 repeat fixed}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{padding:75px 0 75px 25px;position:relative}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax{color:#e5e5e5;font-size:1.5rem;font-weight:400}</style>');
              $('head').append('<!-- style>.parallax-slider__owl_demo_text_carousel_parallax{text-align:center}</style -->');
              $('head').append('<!-- style>.parallax-slider__owl_demo_text_carousel_parallax{text-transform:uppercase}</style -->');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax:before{top:0;left:0;width:100%;height:100%;content:" ";position:absolute;background:url(/assets/images/modules/patterns/gridtile.png) repeat;}</style>');
              $('head').append('<style>.parallax-slider__owl_demo_text_carousel_parallax:after{top:0;left:0;width:100%;height:100%;content:" ";position:absolute;background:rgba(0,0,0,0.3)}</style>');
            $('head').append("<style>.owl_demo_text_carousel_parallax-item{margin: 3px;}</style>");
            //$('.owl_demo_text_carousel_parallax-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','3px');
            // Initialize individual show parameters
            $("#owl_demo_text_carousel_parallax").owlCarousel({
              "autoPlay": 5000,
              "singleItem": true,
              "pagination": false,
              // Enable lazyLoad if lightbox is enabled
              "jsonPath": "/assets/data/carousel.json",
              "jsonSuccess": customDataSuccess_2
            });
            // Initialize instance variable (for later access)
            //owl_demo_text_carousel_parallax = $('#owl_demo_text_carousel_parallax').data('owlCarousel');
            j1["owl_demo_text_carousel_parallax"] = $('#owl_demo_text_carousel_parallax').data('owlCarousel');
            // jQuery show data functions
            function customDataSuccess_2(data){
              var content = "";
              for (var i in data["owl_demo_text_carousel_parallax"]) {
                var text        = data["owl_demo_text_carousel_parallax"][i].text;
                var href        = data["owl_demo_text_carousel_parallax"][i].href;
                var css_classes = 'class="img-fluid";'
                if (href) {
                  content += '<div class="item">' + '<p href=' +href+ '">' +text+ '</p>' + '</div>'
                } else {
                  content += '<div class="item">' + '<p>' +text+ '</p>' + '</div>'
                }
              }
              $("#owl_demo_text_carousel_parallax").html(content);
              logText = 'initializing slider finished on id: owl_demo_text_carousel_parallax';
              logger.info(logText);
            } // END customDataSuccess_2
          } // END if carousel exists
          // Create an Carousel INSTANCE if slider on id: owl_demo_cats exists
          if ($('#owl_demo_cats').length) {
            // Place HTML markup for the title
            // place parallax styles
            $('head').append("<style>.owl_demo_cats-item{margin: 3px;}</style>");
            //$('.owl_demo_cats-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','3px');
            // Initialize individual show parameters
            $("#owl_demo_cats").owlCarousel({
              "navigation": false,
              "itemsCustom": [[0,1],[400,1],[700,2],[1000,2],[1200,2],[1600,2]],
              "slideSpeed": 300,
              "paginationSpeed": 400,
              "items": 2,
              // Enable lazyLoad if lightbox is enabled
              "lazyLoad": true,
              "jsonPath": "/assets/data/carousel.json",
              "jsonSuccess": customDataSuccess_3
            });
            // Initialize instance variable (for later access)
            //owl_demo_cats = $('#owl_demo_cats').data('owlCarousel');
            j1["owl_demo_cats"] = $('#owl_demo_cats').data('owlCarousel');
            // jQuery show data functions
            function customDataSuccess_3(data){
              var content = "";
              for (var i in data["owl_demo_cats"]) {
                var lb          = data["owl_demo_cats"][i].lb;
                var lb_caption  = data["owl_demo_cats"][i].lb_caption;
                var img         = data["owl_demo_cats"][i].img;
                var alt         = data["owl_demo_cats"][i].alt;
                var href        = data["owl_demo_cats"][i].href;
                var css_classes = 'class="img-fluid";'
                // If lightbox is enabled (preference over href)
                if (lb) {
                  if (lb_caption) {
                    content += '\t\t' + '<div class="item owl_demo_cats-item thumbnail">'+ '\n';
                    content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_cats" data-title="' +lb_caption+ '">' + '\n';
                    content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                    content += '\t\t\t' + '</a>' + '\n';
                    if (href) {
                    content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                    } else {
                    content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                    }
                    content += '\t\t' + '</div>' + '\n';
                  } else {
                    content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_cats"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                  }
                } else if (href) {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                } else {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                }
              }
              $("#owl_demo_cats").html(content);
              logText = 'initializing slider finished on id: owl_demo_cats';
              logger.info(logText);
            } // END customDataSuccess_3
          } // END if carousel exists
          // Create an Carousel INSTANCE if slider on id: owl_demo_simple exists
          if ($('#owl_demo_simple').length) {
            // Place HTML markup for the title
            // place parallax styles
            $('head').append("<style>.owl_demo_simple-item{margin: 3px;}</style>");
            //$('.owl_demo_simple-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','3px');
            // Initialize individual show parameters
            $("#owl_demo_simple").owlCarousel({
              "autoPlay": 3000,
              "items": 3,
              "autoHeight": true,
              "pagination": false,
              "paginationNumbers": false,
              "itemsDesktop": "[1199,3]",
              "itemsDesktopSmall": "[979,3]",
              // Enable lazyLoad if lightbox is enabled
              "jsonPath": "/assets/data/carousel.json",
              "jsonSuccess": customDataSuccess_4
            });
            // Initialize instance variable (for later access)
            //owl_demo_simple = $('#owl_demo_simple').data('owlCarousel');
            j1["owl_demo_simple"] = $('#owl_demo_simple').data('owlCarousel');
            // jQuery show data functions
            function customDataSuccess_4(data){
              var content = "";
              for (var i in data["owl_demo_simple"]) {
                var lb          = data["owl_demo_simple"][i].lb;
                var lb_caption  = data["owl_demo_simple"][i].lb_caption;
                var img         = data["owl_demo_simple"][i].img;
                var alt         = data["owl_demo_simple"][i].alt;
                var href        = data["owl_demo_simple"][i].href;
                var css_classes = 'class="img-fluid";'
                // If lightbox is enabled (preference over href)
                if (lb) {
                  if (lb_caption) {
                    content += '\t\t' + '<div class="item owl_demo_simple-item ">'+ '\n';
                    content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_simple" data-title="' +lb_caption+ '">' + '\n';
                    content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                    content += '\t\t\t' + '</a>' + '\n';
                    if (href) {
                    content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                    } else {
                    content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                    }
                    content += '\t\t' + '</div>' + '\n';
                  } else {
                    content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_simple"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                  }
                } else if (href) {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                } else {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                }
              }
              $("#owl_demo_simple").html(content);
              logText = 'initializing slider finished on id: owl_demo_simple';
              logger.info(logText);
            } // END customDataSuccess_4
          } // END if carousel exists
          // Create an Carousel INSTANCE if slider on id: owl_demo_oneslide exists
          if ($('#owl_demo_oneslide').length) {
            // Place HTML markup for the title
            // place parallax styles
            $('head').append("<style>.owl_demo_oneslide-item{margin: 3px;}</style>");
            //$('.owl_demo_oneslide-item').parent().addClass('owl-carousel');
            //$('.owl-carousel .item').css('margin','3px');
            // Initialize individual show parameters
            $("#owl_demo_oneslide").owlCarousel({
              "navigation": true,
              "slideSpeed": 300,
              "paginationSpeed": 400,
              "singleItem": true,
              "transitionStyle": "goDown",
              // Enable lazyLoad if lightbox is enabled
              "lazyLoad": true,
              "jsonPath": "/assets/data/carousel.json",
              "jsonSuccess": customDataSuccess_5
            });
            // Initialize instance variable (for later access)
            //owl_demo_oneslide = $('#owl_demo_oneslide').data('owlCarousel');
            j1["owl_demo_oneslide"] = $('#owl_demo_oneslide').data('owlCarousel');
            // jQuery show data functions
            function customDataSuccess_5(data){
              var content = "";
              for (var i in data["owl_demo_oneslide"]) {
                var lb          = data["owl_demo_oneslide"][i].lb;
                var lb_caption  = data["owl_demo_oneslide"][i].lb_caption;
                var img         = data["owl_demo_oneslide"][i].img;
                var alt         = data["owl_demo_oneslide"][i].alt;
                var href        = data["owl_demo_oneslide"][i].href;
                var css_classes = 'class="img-fluid";'
                // If lightbox is enabled (preference over href)
                if (lb) {
                  if (lb_caption) {
                    content += '\t\t' + '<div class="item owl_demo_oneslide-item ">'+ '\n';
                    content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_oneslide" data-title="' +lb_caption+ '">' + '\n';
                    content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                    content += '\t\t\t' + '</a>' + '\n';
                    if (href) {
                    content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                    } else {
                    content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                    }
                    content += '\t\t' + '</div>' + '\n';
                  } else {
                    content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_oneslide"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                  }
                } else if (href) {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                } else {
                    content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                }
              }
              $("#owl_demo_oneslide").html(content);
              logText = 'initializing slider finished on id: owl_demo_oneslide';
              logger.info(logText);
            } // END customDataSuccess_5
          } // END if carousel exists
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


