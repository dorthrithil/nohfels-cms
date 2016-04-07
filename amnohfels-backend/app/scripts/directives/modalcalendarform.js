'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalCalendarForm
 * @description
 * # modalcalendarform
 */

//TODO (1.0.0) comment
angular.module('amnohfelsBackendApp')
  .directive('modalCalendarForm', function () {
    return {
      templateUrl: 'views/modalcalendarform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.calendaritems = [];
          $scope.modalVars.data.calendaritems.push({
            title: '',
            description: '',
            datetime: '',
            datetimeSort:''
          });
          $scope.editingActive = true;
          $scope.activeCalendaritem = $scope.modalVars.data.calendaritems[0];
        } else {
          $scope.editingActive = false;
          $scope.activeCalendaritem = null;
        }
        $scope.modalVars.route = '/calendar';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;

        $scope.addCalendaritem = function () {
          $scope.modalVars.data.calendaritems.push({
            title: '',
            description: '',
            datetime: '',
            datetimeSort:''
          });
          $scope.editingActive = true;
          $scope.activeCalendaritem = $scope.modalVars.data.calendaritems[$scope.modalVars.data.calendaritems.length - 1];
        };
        $scope.deleteCalendaritem = function (calendaritem) {
          $scope.modalVars.data.calendaritems.splice($scope.modalVars.data.calendaritems.indexOf(calendaritem),1);
        };

        $scope.finishEditing = function(){
          $scope.editingActive = false;
        };

        $scope.editCalendaritem = function(calendaritem){
          $scope.activeCalendaritem = calendaritem;
          $scope.editingActive = true;
        }

      }
    };
  });
