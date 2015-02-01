'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function () {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: function() {
               $(function(){
                    $(this).attr('data-stellar-background-ratio', 0.2).stellar({
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        verticalOffset: 53
                    });
                });
            }
        };
    });
