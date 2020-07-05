
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/gallery_customizer.js
 # J1 Adapter for Gallery Customizer
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Adapter generated: 2020-07-05 11:53:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['gallery_customizer'] = (function (j1, window) {
  var environment       = 'production';
  var galleryOptions    = {};
  var customizerOptions = {};
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // Helper functions
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
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // initialize state flag
      j1.adapter.gallery_customizer.state = 'pending';
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.gallery_customizer',
        generated:   '2020-07-05 11:53:10 +0200'
      }, options);
      galleryOptions    = $.extend({}, {"enabled":true, "xhr_data_path":"/assets/data/galleries.json", "instance_type":"multiple", "rowHeight":170, "galleries":[{"gallery":{"enabled":true, "type":"image", "id":"jg_customizer", "show_delay":250, "css_classes":"mb-3", "images_path":"/assets/images/modules/gallery/mega_cities", "thumb_path":"/assets/images/modules/gallery/mega_cities", "images":["banter-snaps_b.jpg", "denys-nevozhai-1_b.jpg", "gints-gailis_b.jpg", "steven-diaz_b.jpg", "denys-nevozhai-2_b.jpg", "johan-mouchet_b.jpg", "emmad-mazhari_b.jpg", "federico-rizzarelli_b.jpg", "andreas-brucker_b.jpg", "thomas-tucker_b.jpg", "luca-bravo_b.jpg", "ethan-brooke_b.jpg", "oskars-sylwan_b.jpg"], "captions_gallery":["Osaka - Japan", "Man posing at the rooftop of Jin Mao Tower Shanghai - China", "Shangri-La Hotel Jakarta - Indonesia", "Tokyo seen from World Trade Center Observation Deck - Japan", "Young couple over Shenzhen - China", "The Queen Bee at the Eureka Tower - Melbourne Southbank Australia", "Chicago - United States", "Shanghai - China", "Cityscape of Bangkok Downtown - Thailand", "Sunset over Taipei City - Taiwan", "Brooklyn Bridge New York - United States", "Lotte World Tower Seoul - South Korea", "New York City", "United States"], "captions_lightbox":"", "gallery_options":{"rowHeight":150, "margins":1}, "lightbox_options":{"lightbox":"lg", "mode":"lg-fade", "cssEasing":"cubic-bezier(0.25, 0, 0.25, 1)"}}}, {"gallery":{"enabled":true, "type":"video-html5", "id":"jg_video_html5", "show_delay":300, "title":false, "css_classes":"mb-3", "video_path":"https://github.com/jekyll-one-org/jekyll-one-lfs/raw/master/videos", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["video1.mp4", "video2.mp4"], "captions_gallery":["PeckPocketed", "Rollin`Wild"], "captions_lightbox":["<p>CGI Animated Short HD: Student Academy Award Winning <b>PeckPocketed</b> by Kevin Herron</p>", "<p>Rollin`Wild - Short Funny Animated Clips - Film Academy BW</p>"], "poster":["video1-poster.jpg", "video2-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}, {"gallery":{"enabled":true, "type":"video-online", "id":"jg_video_online_youtube", "show_delay":300, "title":false, "css_classes":"mb-3", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["https://www.youtube.com/watch?v=X5Cfi7U4eL4", "https://www.youtube.com/watch?v=Nck6BZga7TQ", "https://www.youtube.com/watch?v=F2SXmzk8ve4", "https://www.youtube.com/watch?v=ln3wAdRAim4"], "captions_gallery":["Carpool Karaoke - Lady Gaga", "Carpool Karaoke - Adele", "Carpool Karaoke - Gwen Stefani", "Carpool Karaoke - First Lady Michelle Obama"], "captions_lightbox":["<p>Carpool Karaoke by James Corden - Lady Gaga <br/> Lady Gaga joins James for a drive through Los Angeles singing her classics and tracks from her new album</p>", "<p>Carpool Karaoke by James Corden - Adele <br/> James Corden is about the holidays in London and gets his girlfriend Adele off for a ride through the city. <br/> On the way they sing some of their biggest hits and Adele raps Nicki Minaj's <b>monster</b></p>", "<p>Carpool Karaoke by James Corden - Gwen Stefani <br/> Gwen Stefani, Julia Roberts, George Clooney and James Corden singing Holla back girl, there's nothing left to see</p>", "<p>Carpool Karaoke by James Corden - First Lady Michelle Obama <br/> James Corden's White House tour takes an unthinkable turn when First Lady Michelle Obama joins him for a drive around the grounds singing Stevie Wonder and Beyonce</p>"], "poster":["video_gaga-poster.jpg", "video_adele-poster.jpg", "video_gwen-poster.jpg", "video_michelle-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}, {"gallery":{"enabled":true, "type":"video-online", "id":"jg_video_online_vimeo", "show_delay":300, "title":false, "thumb_items":2, "thumb_spacing":5, "thumb_bordered":true, "thumb_animate":true, "css_classes":"mb-3", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["https://vimeo.com/175582480", "https://vimeo.com/179528528"], "captions_gallery":["Vogue -  Adriana Lima", "Young Fashion - Kick It Old School"], "captions_lightbox":["<p>Adriana Lima on Vimeo</p>", "<p>Kick It Old School on Vimeo</p>"], "poster":["adriana-lima-poster.jpg", "kick-it-old-school-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg"}}}, {"gallery":{"enabled":true, "type":"video-html5", "id":"jg_video_intro", "show_delay":300, "title":false, "css_classes":"mb-3", "video_path":"/assets/videos/tutorials", "image_path":"/assets/videos/tutorials", "thumb_path":"/assets/videos/tutorials", "videos":["web-erzeugen.1.mp4", "web-erzeugen.2.mp4"], "captions_gallery":["Ein Starter Web erzeugen", "Noch ein Starter Web erzeugen"], "captions_lightbox":["<p>Ein Starter Web erzeugen</p>", "<p>Noch ein Starter Web erzeugen</p>"], "poster":["web-erzeugen-poster.jpg", "web-erzeugen-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}]});
      customizerOptions = $.extend({}, {"enabled":true, "title":"Mega Cities", "xhr_container_id":"customizer", "xhr_data_path":"/assets/data/gallery_customizer/index.html", "gallery_settings":{"rowHeight":150, "maxRowHeight":-1, "justifyLastRow":false, "hideLastRow":false, "margins":1, "border":0, "randomize":false, "sort":false, "refreshTime":200, "refreshSensitivity":0, "justifyThreshold":0.9, "captions":true}});
      _this   = j1.adapter.gallery_customizer;
      logger  = log4javascript.getLogger('j1.adapter.gallery_customizer');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      // ---------------------------------------------------------------------
      // data loader
      // ---------------------------------------------------------------------
      $.when (
        j1.xhrData (
          'j1.adapter.gallery_customizer', {
          xhr_container_id: customizerOptions.xhr_container_id,
          xhr_data_path:    customizerOptions.xhr_data_path },
          'data_loaded'))
      .then (function (success) {
        if (success) {
          logger.info('loading customizer started on id: #' + customizerOptions.xhr_container_id);
          // -------------------------------------------------------------------
          // initializer
          // -------------------------------------------------------------------
          var dependencies_met_data_loaded = setInterval(function() {
            if (_this.getState() == 'data_loaded') {
              var environment     = 'production';
              var galleryId       = '#jg_customizer';
              var $formId         = $('#jg-customizer-form');
              var $instance       = $('#jg_customizer');
              var kbdDelay        = 750;
              var imageHeightMin  = 40;
              logger.info('loading customizer finished on id: #' + customizerOptions.xhr_container_id);
              // -------------------------------------------------------------------
              // load gallery data
              j1.adapter.jf_gallery.initialize(galleryOptions);
              logger.info('initialize customizer ui|forms');
              if ($formId.length) {
                var timerid;
                $("input[name='rowHeight']").on('input', function (e) {
                  var value = $(this).val();
                  if (value < imageHeightMin) { return false; }
                  if($(this).data('lastval') != value){
                      $(this).data('lastval', value);
                      clearTimeout(timerid);
                      //change action
                      timerid = setTimeout(function() {
                        $instance.justifiedGallery({rowHeight: value});
                        if (environment === 'development') {
                          logText = 'Gallery on ID ' +galleryId+ ' changed rowHeight to: ' +value;
                          logger.info(logText);
                        }
                      }, kbdDelay);
                  };
                  e.stopPropagation();
                });
                $('input[name="rowHeightMax"]').on('input', function (e) {
                  var value = $(this).val();
                  if($(this).data('lastval') != value){
                      $(this).data('lastval', value);
                      clearTimeout(timerid);
                      //change action
                      timerid = setTimeout(function() {
                        $instance.justifiedGallery({maxRowHeight: value});
                        if(environment === 'development') {
                          logText = 'Gallery on ID ' +galleryId+ ' changed maxRowHeight to: ' +value;
                          logger.info(logText);
                        }
                      }, kbdDelay);
                  };
                  e.stopPropagation();
                });
                $('input[name="margins"]').on('input', function (e) {
                  var value = $(this).val();
                  if($(this).data('lastval') != value){
                      $(this).data('lastval', value);
                      clearTimeout(timerid);
                      //change action
                      timerid = setTimeout(function() {
                        $instance.justifiedGallery({margins: value});
                        if(environment === 'development') {
                          logText = 'Gallery on ID ' +galleryId+ ' changed margins to: ' +value;
                          logger.info(logText);
                        }
                      }, kbdDelay);
                  };
                  e.stopPropagation();
                });
                $('input[name="border"]').on('input', function (e) {
                  var value = $(this).val();
                  if($(this).data('lastval') != value){
                      $(this).data('lastval', value);
                      clearTimeout(timerid);
                      //change action
                      timerid = setTimeout(function() {
                        $instance.justifiedGallery({border: value});
                        if(environment === 'development') {
                          logText = 'Gallery on ID ' +galleryId+ ' changed padding to: ' +value;
                          logger.info(logText);
                        }
                      }, kbdDelay);
                  };
                  e.stopPropagation();
                });
                $('input:checkbox[name="captions"]').on('click', function (e) {
                  var value = $(this).is(':checked');
                  $instance.justifiedGallery({captions: value});
                  if(environment === 'development') {
                    logText = 'Gallery on ID ' +galleryId+ ' changed captions to: ' +value;
                    logger.info(logText);
                  }
                  e.stopPropagation();
                });
                $('input:checkbox[name="random"]').on('click', function (e) {
                  var value = $(this).is(":checked");
                  $instance.justifiedGallery({randomize: value});
                  if(environment === 'development') {
                    logText = 'Gallery on ID ' +galleryId+ ' changed randomize to: ' +value;
                    logger.info(logText);
                  }
                  e.stopPropagation();
                });
                $('input:checkbox[name="justify_last_row"]').on('click', function (e) {
                  var value = $(this).is(':checked');
                  if (value == true) {
                    value = 'justify';
                    $instance.justifiedGallery({lastRow: value});
                  } else {
                    value = 'nojustify';
                    $instance.justifiedGallery({lastRow: value});
                  }
                  if(environment === 'development') {
                    logText = 'Gallery on ID ' +galleryId+ ' changed lastRow to: ' +value;
                    logger.info(logText);
                  }
                  e.stopPropagation();
                });
                $('input:checkbox[name="hide_last_row"]').on('click', function (e) {
                  var value = $(this).is(":checked");
                  if (value == true) {
                    value = 'hide';
                    $instance.justifiedGallery({lastRow: value});
                  } else {
                    value = 'nojustify';
                    $instance.justifiedGallery({lastRow: value});
                  }
                  if(environment === 'development') {
                    logText = 'Gallery on ID ' +galleryId+ ' changed lastRow to: ' +value;
                    logger.info(logText);
                  }
                  e.stopPropagation();
                });
                $('#jg-customizer-form button[name="reset-defaults"]').on('click', function (e) {
                  $('#rowHeight').val(customizerOptions.gallery_settings.rowHeight);
                  $('#rowHeightMax').val(customizerOptions.gallery_settings.maxRowHeight);
                  $('#margins').val(customizerOptions.gallery_settings.margins);
                  $('#border').val(customizerOptions.gallery_settings.border);
                  $('input:checkbox[name="captions"]').val("on").filter('[value="on"]').prop('checked', customizerOptions.gallery_settings.captions);
                  $('input:checkbox[name="random"]').val("off").filter('[value="off"]').prop('checked', customizerOptions.gallery_settings.randomize);
                  $('input:checkbox[name="justify_last_row"]').val("on").filter('[value="on"]').prop('checked', customizerOptions.gallery_settings.justifyLastRow);
                  $('input:checkbox[name="hide_last_row"]').val("off").filter('[value="off"]').prop('checked', customizerOptions.gallery_settings.hideLastRow);
                  $instance.justifiedGallery({
                    rowHeight:          customizerOptions.gallery_settings.rowHeight,
                    maxRowHeight:       customizerOptions.gallery_settings.maxRowHeight,
                    lastRow:            customizerOptions.gallery_settings.lastRow,
                    margins:            customizerOptions.gallery_settings.margins,
                    border:             customizerOptions.gallery_settings.border,
                    randomize:          customizerOptions.gallery_settings.randomize,
                    sort:               customizerOptions.gallery_settings.sort,
                    refreshTime:        customizerOptions.gallery_settings.refreshTime,
                    refreshSensitivity: customizerOptions.gallery_settings.refreshSensitivity,
                    justifyThreshold:   customizerOptions.gallery_settings.justifyThreshold,
                    captions:           customizerOptions.gallery_settings.captions
                  });
                  if(environment === 'development') {
                    logText = 'Gallery on ID ' +galleryId+ ' reset to default values';
                    logger.info(logText);
                  }
                  e.stopPropagation();
                });
              } // END form events
              // See: https://jsfiddle.net/prathviraj080/vbbbw46a/1/
              $('button.drawer-toggler').click(function(){
                $('button.drawer-toggler span.mdi').toggleClass('mdi-menu mdi-close');
              });
              $('button.drawer-toggler').click(function(){
                $('button.drawer-toggler').toggleClass('fadeIn rotateIn');
              });
              _this.setState('finished');
              logger.info('state: ' + _this.getState());
              logger.info('initializing module finished');
              clearInterval(dependencies_met_data_loaded);
              return true;
            }
          }, 25);
        } // END if success
      })
      .catch(function(error) {
        logger.error('loading html data failed at: j1.xhrData');
        return false;
      }); // End thenable
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
      j1.adapter.gallery_customizer.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.gallery_customizer.state;
    } // END state
  }; // END return
})(j1, window);


