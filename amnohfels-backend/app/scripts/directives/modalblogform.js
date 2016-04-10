'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalBlogForm
 * @description
 * # modalBlogForm
 */

// TODO (1.0.1) handle too many pages which would cause an ugly linebreak
// TODO (1.0.1) lock delete button

angular.module('amnohfelsBackendApp')
  .directive('modalBlogForm', function ($http, config, syncQueue) {
    return {
      templateUrl: 'views/modalblogform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.maxEntries = 3;
        }
        if ($scope.modalVars.action === 'update') {
          // Convert to int so the slider doesn't throw
          $scope.modalVars.data.maxEntries = +$scope.modalVars.data.maxEntries;
        }
        $scope.modalVars.route = '/blog';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;

        var entriesPerPage = 3;
        $scope.numberOfPages = Math.ceil($scope.modalVars.data.entryCount / entriesPerPage);
        $scope.actualPage = 0;

        /**
         * Changes the displayed page of blog entries in the view by loading the corresponding data from the server.
         * @param page The page number to load.
         */
        $scope.changePage = function (page) {
          if (page < 0 || page >= $scope.numberOfPages) {
            return;
          }
          $http.get(config.server.api + 'module/blogentry/' + $scope.modalVars.data.id
            + '/' + page + '/' + entriesPerPage)
            .success(function (data, status) {
              $scope.actualPage = page;
              $scope.entries = data.data;
            })
            .error(function (data, status) {
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
         * Deletes an entry from the blog module.
         * @param entry The entry to delete.
         */
        $scope.deleteEntry = function (entry) {
          syncQueue.push('delete', 'module/blogentry/' + entry.id, null, false);
          $scope.modalVars.data.entryCount--;
        };

        /**
         * After the syncQueue success broadcast some actions have to be performed to sync the model.
         */
        $scope.$on('sq-success', function () {
          // Number of pages could have changed if broadcast reason was a deletion
          $scope.numberOfPages = Math.ceil($scope.modalVars.data.entryCount / entriesPerPage);
          if ($scope.actualPage > $scope.numberOfPages - 1) {
            $scope.actualPage = $scope.numberOfPages - 1
          }
          $scope.changePage($scope.actualPage);
        });

        // start on first page
        $scope.changePage(0);
      }
    };
  });

