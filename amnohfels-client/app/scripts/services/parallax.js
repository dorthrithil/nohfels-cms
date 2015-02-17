'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.parallax
 * @description
 * # parallax
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('parallax', function parallax($window, util, $timeout) {
    var images = [];
    var $parallaxImagesContainer = angular.element('<div class="parallax-images" />');

    //TODO route change functionality

    //TODO proper image sizing

    //TODO test if touchmove event also works

    function init(){
        $('body').prepend($parallaxImagesContainer);
        angular.element($window).bind('resize', function() {
            util.throttle(refresh(), 10);
        });
        angular.element($window).bind('scroll', function() {
            util.throttle(refresh(), 10);
        });
    }

    this.add = function($section, bgImgSrc){
        var $imageContainer = angular.element('<div class="parallax-image" />');
        $parallaxImagesContainer.append($imageContainer);
        var $image = angular.element('<img src="'+bgImgSrc+'" />');
        $imageContainer.append($image);
        images.push({
            container : $imageContainer,
            image : $image,
            section : $section,
            sectionOffset : null
        });
        $timeout(function(){
            images[images.length - 1].sectionOffset = $section.offset().top;
            refresh();
        });

    };

    function refresh(){
        for(var i = 0; i < images.length; i++){
            if(inViewport(images[i].section)) {
                images[i].container.show();
                var sectionPosition = window.pageYOffset - images[i].sectionOffset;
                var imagePosition = parseInt(0.75 * sectionPosition);
                var containerPosition = -sectionPosition;
                images[i].container.css({'transform': 'translate3d(0, ' + containerPosition + 'px, 0)'});
                images[i].image.css({'transform': 'translate3d(0, ' + imagePosition + 'px, 0)'});
            } else{
                images[i].container.hide();
            }
        }
    }

    function inViewport($element){
        var bounds = $element.get(0).getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }

    init();
  });









//                    var bgImgHeight = 0, bgImgWidth = 0;
//                    var parallaxRatio = 0.2;
//
//                    scope.calcBgImgSizes = function(imgHeight, imgWidth){
//                        var sizes = {};
//                        //this is the resulting height, if we strech the image to 100% window width
//                        var strechedImgHeight = imgHeight * ($document.width() / imgWidth);
//                        //our image has to be at least as high as the window + the extra hight needed for parallax scolling
//                        var nominalValue = $document.height() * parallaxRatio + imgHeight;
//                        //if it's higher, we can use 100% width (this way we can see more), otherwise use nominalValue as height
//                        if(strechedImgHeight > nominalValue){
//                            sizes.bg = '100%';
//                            sizes.margin = '-50%';
//                        } else {
//                            sizes.bg = 'auto ' + nominalValue + 'px';
//                            sizes.margin = '-50%';
//                        }
//                        return sizes;
//                    };

//Get orininal image properties and initialize background-size
//                    var bgImg = new Image();
//                    bgImg.onload = function() {
//                        bgImgHeight = this.height;
//                        bgImgWidth = this.width;
//                        scope.refreshBackgroundSizes();
//                    };
//                    bgImg.src = scope.data.bgImgSrc;
//
//                    scope.refreshBackgroundSizes = function(){
//                        var sizes = scope.calcBgImgSizes(bgImgHeight, bgImgWidth);
//                        element.children().children('.parallax-image')
//                            .css('background-size', sizes.bg);
//                            //.css('margin-left', sizes.margin);
//                    };