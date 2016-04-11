'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:blogModule
 * @description
 * # blogModule
 */
angular.module('amnohfelsClientApp')
  .directive('blogModule', function ($http, config, $sce, $location, $anchorScroll) {
    return {
      templateUrl: 'views/blog-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {

        $scope.entries = null;

        $scope.numberOfPages = Math.ceil($scope.data.entryCount / $scope.data.maxEntries);
        $scope.actualPage = 0;

        $scope.scrollId = 'blog' + $scope.data.id;
        $location.hash($scope.scrollId);


        /**
         * Changes the displayed page of blog entries in the view by loading the corresponding data from the server.
         * @param page The page number to load.
         */
        $scope.changePage = function (page) {
          if (page < 0 || page >= $scope.numberOfPages) {
            return;
          }
          $http.get(config.server.api + 'module/blogentry/' + $scope.data.id +
            '/' + page + '/' + $scope.data.maxEntries)
            .success(function (data) {
              $scope.actualPage = page;
              $scope.entries = data.data;
              for (var i = 0; i < $scope.entries.length; i++) {
                $scope.entries[i].text = $sce.trustAsHtml($scope.entries[i].text);
              }
              $anchorScroll();
            })
            .error(function (data) {
              console.log(data);
            });
        };

        /**
         * Utility for ng-repeat to work with numbers.
         * @param num Number of repeats.
         * @returns {Array} Array to iterate over.
         */
        $scope.range = function (num) {
          return new Array(num);
        };

        /**
         * Formats th passed date to a german readable format.
         * @param date The date to format
         * @returns String The formatted date string.
         */
        $scope.formatDate = function (date) {
          return dateFormat(date, 'dd.mm.yyyy "um" HH:MM "Uhr"');
        };

        // INIT
        // Start on first page
        $scope.changePage(0);
      }
    };
  });
