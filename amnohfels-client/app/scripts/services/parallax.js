'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.parallax
 * @description
 * # parallax
 * Service in the amnohfelsClientApp.
 */

//TODO (1.0.1) performance: throttle
//TODO (1.0.1) UI: image onload fadeIn
//TODO (1.0.1) improvement: navbar height doesn't need to be included in height calculations => more visible image content

angular.module('amnohfelsClientApp')
  .service('parallax', function parallax($window, util, $timeout, config, $rootScope) {

    var self = this;

    var images = [],
      parallaxRatio = 0.25;

    /**
     * @name refresh()
     * @attrs none
     * @description
     * refreshes the positions of all registered parallax elements
     */
    this.refresh = function () {
      setImageSizes();
      parallaxScroll();
    };

    /**
     * @name add()
     * @attrs
     * $section: parallax section dom element
     * bgImgSrc: src uri of the parallaxing background image
     * height: height of the parallax section
     * @description
     * adds a new parallax element to the service
     */
    this.add = function ($section, bgImgSrc, height) {
      images.push({
        image: $section.find('img'),
        section: $section,
        height: height,
        sectionOffset: null,
        dimensions: {
          height: null,
          width: null,
          ratio: null
        },
        src: config.server.root + bgImgSrc
      });
      images[images.length - 1].image.attr('src', config.server.root + bgImgSrc); //TODO (1.0.1) do that later for fadein
      initDimensions(images.length - 1);
    };

    /**
     * @name clear()
     * @attrs none
     * @description
     * clears the serviced elements
     */
    this.clear = function () {
      images = [];
    };

    //initializes the watchers for scrolling and window resize, handles flaws with mobile devices
    function init() {
      if (!util.isOnMobileBrowser()) {
        angular.element($window).bind('resize', function () {
          setImageSizes();
          parallaxScroll();
        });
        angular.element($window).bind('scroll', function () {
          parallaxScroll();
        });
      }
      if (util.isOnMobileBrowser()) {
        angular.element($window).bind('orientationchange', function () {
          // we need that additional resize handler because orientationchange triggers before window is resized
          var orientationChangeHandler = function () {
            angular.element($window).unbind('resize', orientationChangeHandler);
            setImageSizes();
          };
          angular.element($window).bind('resize', orientationChangeHandler);
        });
      }
    }

    //initializes the dimensions of the parallaxing image and the section
    function initDimensions(index) {
      var bgImg = new Image(); //create a temporary image
      bgImg.onload = function () { //and hook the function for reading the dimensions as soon as the image has loaded
        images[index].dimensions.height = this.height; //cache height..
        images[index].dimensions.width = this.width; //width..
        images[index].dimensions.ratio = this.width / this.height; //and the ratio
        $timeout(function () { //wait for all actions being performed, then initialize image sizes & scrolling positions
          setImageSizes();
          parallaxScroll();
        });
      };
      bgImg.src = images[index].src; //set the src of the temporary image for starting the above process
    }

    function setSectionHeights(index) {
      // the parallax-module directive element
      var section = images[index].section;
      // the element containing the caption
      var caption = section.find('.caption');
      // the actual parallax container element
      var sectionInner = section.find('.parallax-section');
      // set the height of the section excluding navbar height from vh measurement
      var sectionInnerHeight = util.convertVh(images[index].height);
      sectionInner.css('height', sectionInnerHeight);
      // correct section height if content of title & caption doesn't fit
      // (76px are navbarHeight + caption margin bottom, for equal spacing on top & bottom)
      var captionOffsetBottom = caption.offset().top + caption.height();
      var sectionInnerOffsetBottom = sectionInner.offset().top + sectionInner.height();
      if (captionOffsetBottom + 76 > sectionInnerOffsetBottom) {
        sectionInner.css('height', captionOffsetBottom - sectionInnerOffsetBottom + 1 *
          sectionInnerHeight.substring(0, sectionInnerHeight.length - 2) + 76);
      }
      // cache the sections offset
      images[index].sectionOffset = section.offset().top;
    }

    //scrolls all registered parallax elements
    function parallaxScroll() {
      for (var i = 0; i < images.length; i++) {
        if (util.inViewport(images[i].section)) { //only scroll elements that are in view
          var imagePosition = -Math.floor(parallaxRatio * (window.pageYOffset - images[i].sectionOffset)); //calc the distance we need to scoll..
          images[i].image.css({'transform': 'translate3d(0, ' + imagePosition + 'px, 0)'}); //..and scroll it
        }
      }
    }

    //resizes all images to a size where maximum information is shown while being able to parallax scroll it
    function setImageSizes() {
      for (var i = 0; i < images.length; i++) {
        setSectionHeights(i); //section heights need to be reset on window resize and refresh()

        //init
        var stretchedImgHeight,
          stretchedImgWidth,
          sectionHeight = images[i].section.find('.parallax-section').height(), //height of the section
          scrollHeight = (sectionHeight > window.innerHeight) ? sectionHeight : window.innerHeight, // user larger value for size calculation
          minHeight =  scrollHeight * parallaxRatio * 2 + scrollHeight, //image needs to be as high as the viewport + height for scrolling in and out in parallax speed
          minWidth = window.innerWidth; //image needs to be as broad as the viewport

        //calculate dimensions depending on original image size
        if (images[i].dimensions.height < minHeight) {
          stretchedImgHeight = minHeight; //start with positive thinking
          stretchedImgWidth = stretchedImgHeight * images[i].dimensions.ratio;
          if (stretchedImgWidth < minWidth) { //maybe correct errors
            stretchedImgWidth = minWidth;
            stretchedImgHeight = stretchedImgWidth / images[i].dimensions.ratio;
          }
        } else {
          stretchedImgWidth = minWidth; //start with positive thinking
          stretchedImgHeight = stretchedImgWidth / images[i].dimensions.ratio;
          if (stretchedImgHeight < minHeight) { //maybe correct errors
            stretchedImgHeight = minHeight;
            stretchedImgWidth = stretchedImgHeight * images[i].dimensions.ratio;
          }
        }

        //floor values (css and double values are slow!), +1 for correcting floor errors
        stretchedImgHeight = Math.floor(stretchedImgHeight) + 1;
        stretchedImgWidth = Math.floor(stretchedImgWidth) + 1;

        //set
        if (stretchedImgHeight >= minHeight) {
          images[i].image.css({
            'width': stretchedImgWidth + 'px',
            'height': stretchedImgHeight + 'px',
            'top': -Math.floor(stretchedImgHeight - sectionHeight) / 2 + 'px', //when the parallax section is in the center of the viewport, we also want to see the center of the image
            'left': -Math.floor(stretchedImgWidth - window.innerWidth) / 2 + 'px' //if image is broader than viewport, we want to see the middle part
          });
        } else {
          images[i].image.css({
            'width': stretchedImgWidth + 'px',
            'height': stretchedImgHeight + 'px',
            'top': -Math.floor(stretchedImgHeight - sectionHeight) / 2 + 'px', //when the parallax section is in the center of the viewport, we also want to see the center of the image
            'left': -Math.floor(stretchedImgWidth - window.innerWidth) / 2 + 'px' //if image is broader than viewport, we want to see the middle part
          });
        }
      }
    }

    // clears serviced elements on root change
    $rootScope.$on('$locationChangeStart', function () {
      self.clear();
    });

    init(); //init on construction

  });
