'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:ImprintCtrl
 * @description
 * # ImprintCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('ImprintCtrl', function ($scope, $http, phpServerRoot) {
        var page = '/index.php&site=imprint';
        $http.get(phpServerRoot + page)
            .success(function(response) {
                $scope.sectionData = response;
            });
        $scope.noData = function(sectionData){
            return (sectionData === undefined);
        };
  });
