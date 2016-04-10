'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalBlogForm
 * @description
 * # modalBlogForm
 */

// TODO (1.0.0) angezeigtes datum darf nicht in der selben variable wie model gespeichert werden. das bringt den picker durcheinander

// TODO (1.0.1) handle too many pages which would cause an ugly linebreak
// TODO (1.0.1) lock delete button

angular.module('amnohfelsBackendApp')
  .directive('modalBlogForm', function ($http, config, syncQueue, textAngularManager, util, $filter) {
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

        $scope.editingActive = false;
        $scope.activeEntry = null;
        $scope.action = null;

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
          $http.get(config.server.api + 'module/blogentry/' + $scope.modalVars.data.id +
            '/' + page + '/' + entriesPerPage)
            .success(function (data) {
              $scope.actualPage = page;
              $scope.entries = data.data;
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
         * Deletes an entry from the blog module.
         * @param entry The entry to delete.
         */
        $scope.deleteEntry = function (entry) {
          syncQueue.push('delete', 'module/blogentry/' + entry.id, null, false);
          $scope.modalVars.data.entryCount--;
        };

        /**
         * Opens the new blog entry dialog.
         */
        $scope.newEntry = function () {
          var now = new Date();
          $scope.entrydata = {
            title: '',
            text: '',
            datetime: dateFormat(now, 'dd.mm.yyyy "um" HH:MM:ss "Uhr"'),
            blogModule: $scope.modalVars.data.id
          };
          $scope.action = 'new';
          $scope.editingActive = true;
          $scope.hideModalButtons = true;
        };

        /**
         * Opens the blog entry dialog for the passed entry.
         * @param entry The entry to edit.
         */
        $scope.editEntry = function (entry) {
          $scope.entrydata = entry;
          $scope.action = 'update';
          $scope.editingActive = true;
          $scope.hideModalButtons = true;
        };

        /**
         * Aborts editing/creating of a blog entry and closes the edit dialog.
         */
        $scope.abort = function () {
          $scope.entrydata = null;
          $scope.action = null;
          $scope.editingActive = false;
          $scope.hideModalButtons = false;
          // This will throw away previous changes
          $scope.changePage($scope.actualPage);
        };

        /**
         * Saves the blog entry.
         */
        $scope.saveEntry = function () {
          $scope.entryForm.$submitted = true;
          if ($scope.entryForm.$valid) {
            if ($scope.action === 'update') {
              syncQueue.push('post', 'module/blogentry/' + $scope.entrydata.id, $scope.entrydata, false);
            }
            if ($scope.action === 'new') {
              syncQueue.push('post', 'module/blogentry', $scope.entrydata, false);
              $scope.modalVars.data.entryCount++;
            }
            $scope.entrydata = null;
            $scope.action = null;
            $scope.editingActive = false;
            $scope.hideModalButtons = false;
          }
        };

        /**
         * Drops down the calendar on focus.
         */
        $scope.showCalendar = function () {
          jQuery('dropdown-menu').dropdown();
        };

        /**
         * Hides the datetimepicker after date selection.
         */
        $scope.hideCalendar = function () {
          jQuery('[data-toggle="dropdown"]').parent().removeClass('open');
          var buffer = $scope.entrydata.datetime;
          $scope.entrydata.datetime = $filter('date')(buffer, 'dd.MM.yyyy \'um\' hh:mm \'Uhr\'');
        };

        /**
         * After the syncQueue success broadcast some actions have to be performed to sync the model.
         */
        $scope.$on('sq-success', function () {
          // Number of pages could have changed if broadcast reason was a deletion or a new entry
          $scope.numberOfPages = Math.ceil($scope.modalVars.data.entryCount / entriesPerPage);
          if ($scope.actualPage > $scope.numberOfPages - 1) {
            $scope.actualPage = $scope.numberOfPages - 1;
          }
          $scope.changePage($scope.actualPage);
        });

        // TextAngular settings
        $scope.dismissHook = function () {
          textAngularManager.unregisterEditor('content');
        };
        $scope.modifyHtml = util.taModifyHtml;

        // INIT
        // Start on first page
        $scope.changePage(0);
      }
    };
  });

