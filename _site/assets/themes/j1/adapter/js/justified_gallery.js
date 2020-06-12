
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/justified_gallery.js
 # JS Adapter for JustifiedGallery
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/miromannino/Justified-Gallery
 #
 # Copyright (C) 2020 Juergen Adams
 # Copyright (C) 2016 Miro Mannino
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # Justified Gallery is licensed under the MIT license
 # See: https://github.com/miromannino/Justified-Gallery
 # -----------------------------------------------------------------------------
 # Adapter generated: 2020-06-12 17:59:56 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
// j1.JustifiedGallery = (function (j1, window) {
j1.adapter['jf_gallery'] = (function (j1, window) {
  var environment   = 'development';
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
      j1.adapter.jf_gallery.state = 'pending';
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.jf_gallery',
        generated:   '2020-06-12 17:59:56 +0200'
      }, options);
      // Load  module DEFAULTS|CONFIG
      //
      moduleOptions = $.extend({}, {"enabled":true, "xhr_data_path":"/assets/data/galleries.json", "instance_type":"multiple", "rowHeight":170, "galleries":[{"gallery":{"enabled":true, "type":"image", "id":"jg_customizer", "show_delay":250, "css_classes":"mb-3", "images_path":"/assets/images/modules/gallery/mega_cities", "thumb_path":"/assets/images/modules/gallery/mega_cities", "images":["banter-snaps_b.jpg", "denys-nevozhai-1_b.jpg", "gints-gailis_b.jpg", "steven-diaz_b.jpg", "denys-nevozhai-2_b.jpg", "johan-mouchet_b.jpg", "emmad-mazhari_b.jpg", "federico-rizzarelli_b.jpg", "andreas-brucker_b.jpg", "thomas-tucker_b.jpg", "luca-bravo_b.jpg", "ethan-brooke_b.jpg", "oskars-sylwan_b.jpg"], "captions_gallery":["Osaka - Japan", "Man posing at the rooftop of Jin Mao Tower Shanghai - China", "Shangri-La Hotel Jakarta - Indonesia", "Tokyo seen from World Trade Center Observation Deck - Japan", "Young couple over Shenzhen - China", "The Queen Bee at the Eureka Tower - Melbourne Southbank Australia", "Chicago - United States", "Shanghai - China", "Cityscape of Bangkok Downtown - Thailand", "Sunset over Taipei City - Taiwan", "Brooklyn Bridge New York - United States", "Lotte World Tower Seoul - South Korea", "New York City", "United States"], "captions_lightbox":"", "gallery_options":{"rowHeight":150, "margins":1}, "lightbox_options":{"lightbox":"lg", "mode":"lg-fade", "cssEasing":"cubic-bezier(0.25, 0, 0.25, 1)"}}}, {"gallery":{"enabled":true, "type":"video-html5", "id":"jg_video_html5", "show_delay":300, "title":false, "css_classes":"mb-3", "video_path":"https://github.com/jekyll-one-org/jekyll-one-lfs/raw/master/videos", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["video1.mp4", "video2.mp4"], "captions_gallery":["PeckPocketed", "Rollin`Wild"], "captions_lightbox":["<p>CGI Animated Short HD: Student Academy Award Winning <b>PeckPocketed</b> by Kevin Herron</p>", "<p>Rollin`Wild - Short Funny Animated Clips - Film Academy BW</p>"], "poster":["video1-poster.jpg", "video2-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}, {"gallery":{"enabled":true, "type":"video-online", "id":"jg_video_online_youtube", "show_delay":300, "title":false, "css_classes":"mb-3", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["https://www.youtube.com/watch?v=X5Cfi7U4eL4", "https://www.youtube.com/watch?v=Nck6BZga7TQ", "https://www.youtube.com/watch?v=F2SXmzk8ve4", "https://www.youtube.com/watch?v=ln3wAdRAim4"], "captions_gallery":["Carpool Karaoke - Lady Gaga", "Carpool Karaoke - Adele", "Carpool Karaoke - Gwen Stefani", "Carpool Karaoke - First Lady Michelle Obama"], "captions_lightbox":["<p>Carpool Karaoke by James Corden - Lady Gaga <br/> Lady Gaga joins James for a drive through Los Angeles singing her classics and tracks from her new album</p>", "<p>Carpool Karaoke by James Corden - Adele <br/> James Corden is about the holidays in London and gets his girlfriend Adele off for a ride through the city. <br/> On the way they sing some of their biggest hits and Adele raps Nicki Minaj's <b>monster</b></p>", "<p>Carpool Karaoke by James Corden - Gwen Stefani <br/> Gwen Stefani, Julia Roberts, George Clooney and James Corden singing Holla back girl, there's nothing left to see</p>", "<p>Carpool Karaoke by James Corden - First Lady Michelle Obama <br/> James Corden's White House tour takes an unthinkable turn when First Lady Michelle Obama joins him for a drive around the grounds singing Stevie Wonder and Beyonce</p>"], "poster":["video_gaga-poster.jpg", "video_adele-poster.jpg", "video_gwen-poster.jpg", "video_michelle-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}, {"gallery":{"enabled":true, "type":"video-online", "id":"jg_video_online_vimeo", "show_delay":300, "title":false, "thumb_items":2, "thumb_spacing":5, "thumb_bordered":true, "thumb_animate":true, "css_classes":"mb-3", "image_path":"/assets/videos/gallery", "thumb_path":"/assets/videos/gallery", "videos":["https://vimeo.com/175582480", "https://vimeo.com/179528528"], "captions_gallery":["Vogue -  Adriana Lima", "Young Fashion - Kick It Old School"], "captions_lightbox":["<p>Adriana Lima on Vimeo</p>", "<p>Kick It Old School on Vimeo</p>"], "poster":["adriana-lima-poster.jpg", "kick-it-old-school-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg"}}}, {"gallery":{"enabled":true, "type":"video-html5", "id":"jg_video_intro", "show_delay":300, "title":false, "css_classes":"mb-3", "video_path":"/assets/videos/tutorials", "image_path":"/assets/videos/tutorials", "thumb_path":"/assets/videos/tutorials", "videos":["web-erzeugen.1.mp4", "web-erzeugen.2.mp4"], "captions_gallery":["Ein Starter Web erzeugen", "Noch ein Starter Web erzeugen"], "captions_lightbox":["<p>Ein Starter Web erzeugen</p>", "<p>Noch ein Starter Web erzeugen</p>"], "poster":["web-erzeugen-poster.jpg", "web-erzeugen-poster.jpg"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "videojs":true, "videojsOptions":{}}}}]});
      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
      _this = j1.adapter.jf_gallery;
      logger = log4javascript.getLogger('j1.adapter.jf_gallery');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      _this.initialize(moduleOptions);
      return true;
    },
    // -----------------------------------------------------------------------
    // Load AJAX data and initialize the jg gallery
    // -----------------------------------------------------------------------
    initialize: function (options) {
      logger = log4javascript.getLogger('j1.adapter.jf_gallery.init');
      _this.setState('running');
      logger.info('state: ' + _this.getState());
          // Create an gallery instance if id: jg_customizer exists
          if ($('#jg_customizer').length) {
          logText = 'gallery is being initialized on id: #jg_customizer';
          logger.info(logText);
          // Place HTML markup for the title
          $('#jg_customizer').addClass("justified-gallery mb-3");
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              for (var i in data["jg_customizer"]) {
                var img               = data["jg_customizer"][i].img;
                // var img               = data["jg_customizer"][i].image_path + '/' + data["jg_customizer"][i].poster;
                var captions_gallery  = data["jg_customizer"][i].captions_gallery;
                var captions_lightbox = data["jg_customizer"][i].captions_lightbox;
                var lightbox          = "lg";
                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '  <img src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                } else {
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  ' <img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                }
                content +=  '</a>' + '\n';
              } // END for
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_customizer").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_customizer");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery({
                    "rowHeight": 150,
                    "margins": 1,
                  })
                  .on('jg.complete', function (e) {
                    e.stopPropagation();
                    // options enabled
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "mode": "lg-fade",
                      "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_customizer'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_customizer").show();
                      logText = 'initializing gallery finished on id: #jg_customizer';
                      logger.info(logText);
                    }, 250);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 150,
                    "margins": 1,
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "mode": "lg-fade",
                      "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_customizer'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_customizer").show();
                      logText = 'initializing gallery finished on id: #jg_customizer';
                      logger.info(logText);
                      }, 250);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_video_html5 exists
          if ($('#jg_video_html5').length) {
          logText = 'gallery is being initialized on id: #jg_video_html5';
          logger.info(logText);
          // Place HTML markup for the title
          $('#jg_video_html5').addClass("justified-gallery mb-3");
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var play_button = '/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png';
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              for (var i in data["jg_video_html5"]) {
                // var img               = data["jg_video_html5"][i].img;
                var img               = data["jg_video_html5"][i].image_path + '/' + data["jg_video_html5"][i].poster;
                var captions_gallery  = data["jg_video_html5"][i].captions_gallery;
                var captions_lightbox = data["jg_video_html5"][i].captions_lightbox;
                var video_id          = data["jg_video_html5"][i].video_id;
                var video             = data["jg_video_html5"][i].video;
                var lightbox          = "lg"; 
                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content += ' data-html="#' +video_id+ '">' + '\n';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                } else {
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                }
                content +=  '</a>' + '\n';
              } // END for
              var hidden_video_div = '';
              for (var i in data["jg_video_html5"]) {
                var video        = data["jg_video_html5"][i].video_path + '/' + data["jg_video_html5"][i].video;
                var poster       = data["jg_video_html5"][i].image_path + '/' + data["jg_video_html5"][i].poster;
                var caption      = data["jg_video_html5"][i].captions_lightbox;
                var video_id     = data["jg_video_html5"][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#jg_video_html5').before(hidden_video_div);
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_video_html5").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_video_html5");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  })
                  .on('jg.complete', function (e) {
                    e.stopPropagation();
                    // options enabled
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_html5'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_html5").show();
                      logText = 'initializing gallery finished on id: #jg_video_html5';
                      logger.info(logText);
                    }, 300);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_html5'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_html5").show();
                      logText = 'initializing gallery finished on id: #jg_video_html5';
                      logger.info(logText);
                      }, 300);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_video_online_youtube exists
          if ($('#jg_video_online_youtube').length) {
          logText = 'gallery is being initialized on id: #jg_video_online_youtube';
          logger.info(logText);
          // Place HTML markup for the title
          $('#jg_video_online_youtube').addClass("justified-gallery mb-3");
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var play_button = '/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png';
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              for (var i in data["jg_video_online_youtube"]) {
                // var img               = data["jg_video_online_youtube"][i].img;
                var img               = data["jg_video_online_youtube"][i].image_path + '/' + data["jg_video_online_youtube"][i].poster;
                var captions_gallery  = data["jg_video_online_youtube"][i].captions_gallery;
                var captions_lightbox = data["jg_video_online_youtube"][i].captions_lightbox;
                var video_id          = data["jg_video_online_youtube"][i].video_id;
                var video             = data["jg_video_online_youtube"][i].video;
                var lightbox          = "lg"; 
                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content += ' data-src="' +video+ '">' + '\n';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                } else {
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                }
                content +=  '</a>' + '\n';
              } // END for
              var hidden_video_div = '';
              for (var i in data["jg_video_online_youtube"]) {
                var video        = data["jg_video_online_youtube"][i].video_path + '/' + data["jg_video_online_youtube"][i].video;
                var poster       = data["jg_video_online_youtube"][i].image_path + '/' + data["jg_video_online_youtube"][i].poster;
                var caption      = data["jg_video_online_youtube"][i].captions_lightbox;
                var video_id     = data["jg_video_online_youtube"][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#jg_video_online_youtube').before(hidden_video_div);
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_video_online_youtube").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_video_online_youtube");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  })
                  .on('jg.complete', function (e) {
                    e.stopPropagation();
                    // options enabled
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_online_youtube'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_online_youtube").show();
                      logText = 'initializing gallery finished on id: #jg_video_online_youtube';
                      logger.info(logText);
                    }, 300);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_online_youtube'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_online_youtube").show();
                      logText = 'initializing gallery finished on id: #jg_video_online_youtube';
                      logger.info(logText);
                      }, 300);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_video_online_vimeo exists
          if ($('#jg_video_online_vimeo').length) {
          logText = 'gallery is being initialized on id: #jg_video_online_vimeo';
          logger.info(logText);
          // Place HTML markup for the title
          $('#jg_video_online_vimeo').addClass("justified-gallery mb-3");
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var play_button = '/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png';
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              for (var i in data["jg_video_online_vimeo"]) {
                // var img               = data["jg_video_online_vimeo"][i].img;
                var img               = data["jg_video_online_vimeo"][i].image_path + '/' + data["jg_video_online_vimeo"][i].poster;
                var captions_gallery  = data["jg_video_online_vimeo"][i].captions_gallery;
                var captions_lightbox = data["jg_video_online_vimeo"][i].captions_lightbox;
                var video_id          = data["jg_video_online_vimeo"][i].video_id;
                var video             = data["jg_video_online_vimeo"][i].video;
                var lightbox          = "lg"; 
                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content += ' data-src="' +video+ '">' + '\n';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                } else {
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                }
                content +=  '</a>' + '\n';
              } // END for
              var hidden_video_div = '';
              for (var i in data["jg_video_online_vimeo"]) {
                var video        = data["jg_video_online_vimeo"][i].video_path + '/' + data["jg_video_online_vimeo"][i].video;
                var poster       = data["jg_video_online_vimeo"][i].image_path + '/' + data["jg_video_online_vimeo"][i].poster;
                var caption      = data["jg_video_online_vimeo"][i].captions_lightbox;
                var video_id     = data["jg_video_online_vimeo"][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#jg_video_online_vimeo').before(hidden_video_div);
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_video_online_vimeo").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_video_online_vimeo");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  })
                  .on('jg.complete', function (e) {
                    e.stopPropagation();
                    // options enabled
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_online_vimeo'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_online_vimeo").show();
                      logText = 'initializing gallery finished on id: #jg_video_online_vimeo';
                      logger.info(logText);
                    }, 300);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_online_vimeo'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_online_vimeo").show();
                      logText = 'initializing gallery finished on id: #jg_video_online_vimeo';
                      logger.info(logText);
                      }, 300);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_video_intro exists
          if ($('#jg_video_intro').length) {
          logText = 'gallery is being initialized on id: #jg_video_intro';
          logger.info(logText);
          // Place HTML markup for the title
          $('#jg_video_intro').addClass("justified-gallery mb-3");
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var play_button = '/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png';
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              for (var i in data["jg_video_intro"]) {
                // var img               = data["jg_video_intro"][i].img;
                var img               = data["jg_video_intro"][i].image_path + '/' + data["jg_video_intro"][i].poster;
                var captions_gallery  = data["jg_video_intro"][i].captions_gallery;
                var captions_lightbox = data["jg_video_intro"][i].captions_lightbox;
                var video_id          = data["jg_video_intro"][i].video_id;
                var video             = data["jg_video_intro"][i].video;
                var lightbox          = "lg"; 
                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content += ' data-html="#' +video_id+ '">' + '\n';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                } else {
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay" src="/assets/themes/j1/extensions/light_gallery/css/themes/icons/play-button.png"></span>' + '\n';
                }
                content +=  '</a>' + '\n';
              } // END for
              var hidden_video_div = '';
              for (var i in data["jg_video_intro"]) {
                var video        = data["jg_video_intro"][i].video_path + '/' + data["jg_video_intro"][i].video;
                var poster       = data["jg_video_intro"][i].image_path + '/' + data["jg_video_intro"][i].poster;
                var caption      = data["jg_video_intro"][i].captions_lightbox;
                var video_id     = data["jg_video_intro"][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#jg_video_intro').before(hidden_video_div);
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_video_intro").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_video_intro");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  })
                  .on('jg.complete', function (e) {
                    e.stopPropagation();
                    // options enabled
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_intro'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_intro").show();
                      logText = 'initializing gallery finished on id: #jg_video_intro';
                      logger.info(logText);
                    }, 300);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      "lightbox": "lg",
                      "videojs": true,
                      "videojsOptions": {},
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1['jg_video_intro'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { 
                      $("#jg_video_intro").show();
                      logText = 'initializing gallery finished on id: #jg_video_intro';
                      logger.info(logText);
                      }, 300);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
    }, // END function initialize
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
        _this.setState('finished');
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
      j1.adapter.jf_gallery.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.jf_gallery.state;
    } // END state
  }; // END return
})(j1, window);

