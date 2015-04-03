'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:module
 * @description
 * # module
 */

//TODO this could be a pure controller & should be named "page"
//TODO don't name it response in scope
//TODO queue driven syncing with server

angular.module('amnohfelsBackendApp')
    .directive('module', function (phpServerRoot, $http, syncQueue) {
        return {
            templateUrl: '/views/module.html',
            restrict: 'E',
            scope: {
                topic: '='
            },
            controller: function ($scope) {
                $http.get(phpServerRoot + '/index.php?q=page&topic=' + $scope.topic)
                    .success(function (response) {
                        $scope.response = response;
                    });
                $http.get(phpServerRoot + '/index.php?q=module_types')
                    .success(function (response) {
                        $scope.moduleTypes = response;
                    });
                $scope.up = function(module){
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex - 1];
                    $scope.response[moduleYIndex - 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('q=swap_modules&upper=' + (moduleYIndex - 1));
                };
                $scope.down = function(module){
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex + 1];
                    $scope.response[moduleYIndex + 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('q=swap_modules&upper=' + moduleYIndex);
                };
                $scope.isSynced = function(){
                    return syncQueue.isSynced();
                };
            }
        };
    });
