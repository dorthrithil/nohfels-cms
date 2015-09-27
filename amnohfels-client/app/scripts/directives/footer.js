'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:footer
 * @description
 * # footer
 */
angular.module('amnohfelsClientApp')
  .directive('footer', function (config, topicService, $window, $timeout) {
    return {
      templateUrl: 'views/footer.html',
      restrict: 'E',
      link: function postLink(scope, element) {

        scope.setFooterHeight = function() {
          // timeout is needed to assure that the height gets set _after_ ngRepeat rendered the footer topics
          $timeout(function(){
            element.children('.footer-outer')
              .css('padding-bottom', element.children('.footer-outer').children().css('height'));
          });
        };

        angular.element($window).bind('resize', scope.setFooterHeight);
      },
      controller: function ($scope) {
        $scope.date = new Date();
        $scope.company = config.company;
        topicService.getFootTopics().then(function (topics) {
          $scope.topics = topics;
          // footer height needs to be set after footer topics got injected
          $scope.setFooterHeight();
        });
      }
    };
  });
