'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:resizableAlert
 * @description
 * # resizableAlert
 * measures an alert of unknown height using an invisible clone and sets the original elements height properly, allowing css height animations
 */

//TODO (1.0.1) refactoring: i dont like using attr. hacky!

angular.module('amnohfelsClientApp')
    .directive('resizableAlert', function ($compile, $timeout, util, $window) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var $clone = element.children().clone(); //create a clone dom element (inner html of alert attribute)
                var parentWidth = element.parent().css('width'); //get the with from the actual parent of the original alert
                var $cloneAlert = angular.element('<alert type="' + element.attr('type') + '" style="display:block; overflow:auto; height:auto"></alert>'); //create a new alert (without this directive, so we don't get an endless loop)
                var $cloneParent = angular.element('<div style="width:' + parentWidth + '; position:fixed; top: 0px; left:0px; visibility: hidden; z-index:9999"></div>'); //create a parent div with a width of parentWidth
                //append and compile
                $cloneAlert.append($clone);
                $cloneParent.append($cloneAlert);
                element.parent().append($compile($cloneParent)(scope.$parent));
                //write actual height in original alert as an attribute after clone got rendered
                $timeout(function () {
                    element.attr('actual-height', $cloneAlert.css('height'));
                });
                //bind measuring procedure to window resize
                angular.element($window).bind('resize', function () {
                    //util.debounce(function () { //TODO (1.0.1) performance: better promise based debounce function. this way, if we have three elements calling debounce at the same time, only the last call get's resolved after the debounce delay
                    parentWidth = element.parent().css('width');
                    $cloneParent.css('width', parentWidth);
                    element.attr('actual-height', $cloneAlert.css('height'));
                    //}, 150);
                });
            }
        };
    });
