'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:error
 * @description
 * # error
 * Contains and renders error messages on unsuccessful route changes. The route change events get triggered in the
 * preload service which is used by the router.
 */

//TODO (1.0.1) handle other statuses then 404

angular.module('amnohfelsClientApp')
  .directive('error', function ($compile) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {

        // add error content on unsuccessful route change
        scope.$on('$routeChangeError', function(angularEvent, current, previous, rejection){
          if(rejection.status === 404) {
            var status404 = angular.element('<status404></status404>');
            element.append($compile(status404)(scope));
          }
        });

        // empty previously added error content on a successful route change
        scope.$on('$routeChangeSuccess', function(){
          element.empty();
        });

      }
    };
  });
