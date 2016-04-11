'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:calendaritem
 * @description
 * # infotile
 */

//TODO (1.0.0) comment
angular.module('amnohfelsBackendApp')
  .directive('calendaritem', function ($filter) {
    return {
      templateUrl: 'views/calendaritem.html',
      restrict: 'E',
      scope: {
        data: '=' //passing the modalVars.data in
      },
      controller: function ($scope) {

        $scope.datetimeView = $scope.$parent.formatDate($scope.data.datetime); 

        //actions
        $scope.showConfirmDeletion = false;
        $scope.remove = function () {
          switch ($scope.showConfirmDeletion) {
            case false:
              $scope.showConfirmDeletion = true; //confirm deletion
              break;
            case true:
              $scope.$parent.deleteCalendaritem($scope.index); //delegate to modal
          }
        };

        $scope.showCalendar = function() {
          jQuery('dropdown-menu').dropdown();
        };

        $scope.hideCalendar = function () {
          jQuery('[data-toggle="dropdown"]').parent().removeClass('open');
          $scope.datetimeView = $filter('date')($scope.data.datetime, 'dd.MM.yyyy \'um\' hh:mm \'Uhr\'');
        };

        $scope.finishEditingRequested = false;

        $scope.finishEditing = function(){
          $scope.finishEditingRequested = true;
          if(!($scope.data.datetime === '' || $scope.innerForm.title.$error.required)){
            $scope.$parent.finishEditing(); //delegate to modal
          }
        };

      }
    };
  });
