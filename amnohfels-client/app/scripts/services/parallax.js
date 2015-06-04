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
    .service('parallax', function parallax($window, util, $timeout, config) {

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
            images[images.length - 1].image.attr('src', config.server.root + bgImgSrc); //TODO (1.0.0) do that later for fadein
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

        //initializes the watchers for scrolling and window resize
        function init() {
            angular.element($window).bind('resize', function () {
                setImageSizes();
                parallaxScroll();
            });
            angular.element($window).bind('scroll', function () {
                parallaxScroll();
            });
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
            images[index].section.children().css('height', util.convertVh(images[index].height)); //set the height of the section excluding navbar from vh measurement
            images[index].sectionOffset = images[index].section.offset().top; //cache the sections offset
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
                setSectionHeights(i); //section heights need to be resetted on window resize and refresh()

                //init
                var stretchedImgHeight,
                    stretchedImgWidth,
                    minHeight = window.innerHeight * parallaxRatio * 2 + window.innerHeight, //image needs to be as high as the viewport + width for scrolling in and out in parallax speed
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
                        'top': -Math.floor(stretchedImgHeight - window.innerHeight) / 2 + 'px', //when the parallax section is in the center of the viewpost, we also want to see the center of the image
                        'left': -Math.floor(stretchedImgWidth - window.innerWidth) / 2 + 'px' //if image is broader than viewport, we want to see the middle part
                    });
                } else {
                    images[i].image.css({
                        'width': stretchedImgWidth + 'px',
                        'height': stretchedImgHeight + 'px',
                        'top': -Math.floor(stretchedImgHeight - window.innerHeight) / 2 + 'px', //when the parallax section is in the center of the viewpost, we also want to see the center of the image
                        'left': -Math.floor(stretchedImgWidth - window.innerWidth) / 2 + 'px' //if image is broader than viewport, we want to see the middle part
                    });
                }
            }
        }

        init(); //init on construction

    });
