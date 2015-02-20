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
    var parallaxRatio = 0.25;

    //TODO test if touchmove event also works

    //TODO while loops in extra functions?

    //TODO container height minus navbar height

    function init(){
        $('body').prepend($parallaxImagesContainer);
        angular.element($window).bind('resize', function() {
            //TODO in one throttle!
            util.throttle(setImageSizes(), 10);
            util.throttle(parallaxScroll(), 10);
        });
        angular.element($window).bind('scroll', function() {
            util.throttle(parallaxScroll(), 10);
        });
        console.log('parallax init');
    }

    this.add = function($section, bgImgSrc){
        var $imageContainer = angular.element('<div class="parallax-image" />');
        $parallaxImagesContainer.append($imageContainer);
        var $image = angular.element('<img src="'+bgImgSrc+'" />');
        $imageContainer.append($image);
        images.push({
            container : $imageContainer, //TODO which values should i really cache?
            image : $image,
            section : $section,
            sectionOffset : null,
            dimensions : {
                height : null,
                width : null
            }
        });
        initDimensions(bgImgSrc, images.length - 1);
        $timeout(function(){
            images[images.length - 1].sectionOffset = $section.offset().top;
            parallaxScroll();
        });
        console.log('parallax section add');
    };

    this.clear = function(){
        console.log('cleared');
        images = [];
        $parallaxImagesContainer.children().remove();
    };

    //TODO bind this to the dom image load event?
    function initDimensions(src, index){
        var bgImg = new Image();
        bgImg.onload = function() {
            images[index].dimensions.height = this.height;
            images[index].dimensions.width = this.width;
            setImageSizes();
        };
        bgImg.src = src;
    }


    //scrolls all registered parallax elements
    function parallaxScroll(){
        for(var i = 0; i < images.length; i++){
            if(util.inViewport(images[i].section)) {
                images[i].container.show();
                var sectionPosition = parseInt(window.pageYOffset - images[i].sectionOffset);
                var imagePosition = parseInt((1 - parallaxRatio) * sectionPosition);
                var containerPosition = -sectionPosition;
                images[i].container.css({'transform': 'translate3d(0, ' + containerPosition + 'px, 0)'});
                images[i].image.css({'transform': 'translate3d(0, ' + imagePosition + 'px, 0)'});
            } else{
                images[i].container.hide();
            }
        }
    }

    //resizes all images to a size where maximum information is shown while being able to parallax scroll it
    //TODO comment this
    function setImageSizes(){
        for(var i = 0; i < images.length; i++){
            images[i].sectionOffset = images[i].section.offset().top;//TODO best way to do this?
            var imgHeight = images[i].dimensions.height;
            var imgWidth = images[i].dimensions.width;
            var containerHeight = parseInt(images[i].container.css('height')); //TODO is there a way to do this without parseInt?
            var containerWidth = parseInt(images[i].container.css('width'));
            var nominalValue = containerHeight * (parallaxRatio + 1);
            var strechedImgHeight = imgHeight * containerWidth / imgWidth;
            var strechedImgWidth = nominalValue / imgHeight * imgWidth;

            console.log(containerHeight);
            console.log(containerWidth);

            if(strechedImgHeight > nominalValue){
                images[i].image.css({
                    'width':    '100%',
                    'height':   strechedImgHeight + 'px',
                    'top' :     parseInt(-(strechedImgHeight - containerHeight) / 2) + 'px',
                    'left' :    '0px'
                });
            } else {
                images[i].image.css({
                    'width'     : strechedImgWidth + 'px',
                    'height'    : nominalValue + 'px',
                    'top'       : '0px',
                    'left'      : parseInt(-(strechedImgWidth - containerWidth) / 2) + 'px'
                });
            }
        }
    }

    init();
  });