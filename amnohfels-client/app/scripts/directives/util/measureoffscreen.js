'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:measureOffscreen
 * @description
 * # measureOffscreen
 *
 * measures an alert of unknown height using an invisible clone and sets the original elements height properly allowing css height animations
 */

//TODO rename
//TODO i dont like using attr. hacky!

angular.module('amnohfelsClientApp')
    .directive('measureOffscreen', function ($compile, $timeout, util, $window) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var $clone = element.children().clone();
                var parentWidth = element.parent().css('width');
                var $cloneAlert = angular.element('<alert type="' + element.attr('type') + '" style="display:block; overflow:auto; height:auto"></alert>');
                var $cloneParent = angular.element('<div style="width:' + parentWidth + '; position:fixed; top: 0px; left:0px; visibility: hidden; z-index:9999"></div>');
                $cloneAlert.append($clone);
                $cloneParent.append($cloneAlert);
                element.parent().append($compile($cloneParent)(scope.$parent));
                $timeout(function () {
                    element.attr('actual-height', $cloneAlert.css('height'));
                });
                angular.element($window).bind('resize', function () {
                    //util.debounce(function () { //TODO better promise based debounce function. this way, if we have three elements calling debounce at the same time, only the last call get's resolved after the debounce delay
                    parentWidth = element.parent().css('width');
                    $cloneParent.css('width', parentWidth);
                    element.attr('actual-height', $cloneAlert.css('height'));
                    //}, 150);
                });
            }
        };
    });
