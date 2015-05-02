'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:preloadable
 * @description
 * # preloadable
 * broadcasts 'lbImageLoaded' to rootScope, to notify listeners, that image has finished loading.
 */

angular.module('amnohfelsClientApp')
  .directive('preloadable', function ($rootScope) {
    return {
      restrict: 'A',
        link: function(scope, element) {
            var broadcastLoaded = function(e){
                $rootScope.$broadcast('lbImageLoaded');
            };
            element.bind('load', broadcastLoaded);
        }
    };
  });
