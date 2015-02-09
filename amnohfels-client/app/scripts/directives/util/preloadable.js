'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:preloadable
 * @description
 * # preloadable
 */
angular.module('amnohfelsClientApp')
  .directive('preloadable', function () {
    return {
      restrict: 'A',
        link: function(scope, element) {
            element.attr('loaded', 'false');
            element.bind('load' , function(e){
                scope.$apply(function(){
                    element.attr('loaded', 'true');
                });
            });
        }
    };
  });
