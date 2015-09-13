'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalInfotileForm
 * @description
 * # modalInfotileForm
 */

//TODO absätze im text

angular.module('amnohfelsBackendApp')
  .directive('modalInfotileForm', function () {
    return {
      templateUrl: 'views/modalinfotileform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.infotiles = [];
        }
        $scope.modalVars.route = '/infotile';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;

        $scope.addInfotile = function () {
          $scope.modalVars.data.infotiles.push({
            title: '',
            imageSrc: '',
            text: '',
            urlEnabled: false,
            url: ''
          });
        };
        $scope.deleteInfotile = function (index) {
          $scope.modalVars.data.infotiles.splice(index, 1);
        };

        $scope.swapDownInfotile = function (index) {
          var tempInfotile = $scope.modalVars.data.infotiles[index];
          $scope.modalVars.data.infotiles[index] = $scope.modalVars.data.infotiles[index + 1];
          $scope.modalVars.data.infotiles[index + 1] = tempInfotile;
        };

        // form validation: infotiles
        $scope.infotilesValid = function(){
          for(var i = 0; i < $scope.modalVars.data.infotiles.length; i++ ){
            if($scope.modalVars.data.infotiles[i].title === '' || $scope.modalVars.data.infotiles[i].text === '' ||
              ($scope.modalVars.data.infotiles[i].urlEnabled && $scope.modalVars.data.infotiles[i].url === '')) {
              return false;
            }
          }
          return true;
        };

      }
    };
  });
