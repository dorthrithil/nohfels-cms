'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalCalendarForm
 * @description
 * # modalcalendarform
 */
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
        $scope.deleteCalendaritem = function (index) {
          $scope.modalVars.data.calendaritems.splice(index, 1);
        };

        // form validation: calendaritems
        $scope.calendaritemsValid = function () {
          for (var i = 0; i < $scope.modalVars.data.calendaritems.length; i++) {
            if ($scope.modalVars.data.calendaritems[i].title === '' ||
              $scope.modalVars.data.calendaritems[i].description === '') {
              return false;
            }
          }
          return true;
        };



        $scope.finishEditing = function(){
          $scope.editingActive = false;
        };

        $scope.editCalendaritem = function(index){
          $scope.activeCalendaritem = $scope.modalVars.data.calendaritems[index];
          $scope.editingActive = true;
        }

      }
    };
  });
