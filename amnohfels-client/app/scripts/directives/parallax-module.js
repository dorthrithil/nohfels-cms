'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

//TODO (1.0.1) img fadein after size comutation
//TODO (1.0.1) enhancement (UI): fadeIn image onload
//TODO (1.0.1) better pass module id in each module than firstModule in only this one

angular.module('amnohfelsClientApp')
  .directive('parallaxModule', function (parallax, $window, $timeout, config, $sce) {
    return {
      templateUrl: 'views/parallax-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      link: {
        pre: function (scope, element) {
          //element.children().css('height',scope.data.heightNum + scope.data.heightUnit);
          parallax.add(element, scope.data.bgImgSrc, scope.data.heightNum + scope.data.heightUnit);
          if(scope.firstModule){
            element.children().addClass('first-module');
          }
        }
      },
      controller: function ($scope) {
        $scope.data.title = $sce.trustAsHtml($scope.data.title);
        //link uploaded files to server toot
        $scope.data.caption = $scope.data.caption.replace(new RegExp('uploads/files/', 'g'), config.server.root + 'uploads/files/');
        $scope.data.caption = $sce.trustAsHtml($scope.data.caption);

        $scope.imgSrc = config.server.root + $scope.data.bgImgSrc;

        //let the scroll hint vanish on first scroll event
        $scope.scrollHintOpacity = 1; //initial opacity
        var hideScrollHint = function () {
          angular.element($window).unbind('scroll', hideScrollHint); //unbind again for better performance
          $timeout(function () { //use timeout to invoke an new digest cycle so getScrollHintOpacity gets called again and changes can take effect
            $scope.scrollHintOpacity = 0;
          });
        };
        if ($scope.firstModule) {
          angular.element($window).bind('scroll', hideScrollHint); //bind to (first) scroll event

        }
        $scope.getScrollHintOpacity = function () { //function returning opacity object for ngStyle
          return {
            opacity: $scope.scrollHintOpacity
          };
        };
      }
    };
  });
