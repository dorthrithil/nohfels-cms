'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:module
 * @description
 * # module
 */

//TODO this should be named "page"
//TODO don't name it response in scope
//TODO better compile whole modal (pass type as argument), not only the forms. this way we can get the modal logic in the modal file. soc!

angular.module('amnohfelsBackendApp')
    .directive('module', function (phpServerRoot, $http, syncQueue, $compile) {
        return {
            templateUrl: '/views/module.html',
            restrict: 'E',
            scope: {
                topic: '='
            },
            link: function postLink(scope, element) {
                scope.showModal = function (moduleType) {
                    scope.modalVars = {
                        type: moduleType
                    };
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };
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
                $scope.up = function (module) {
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex - 1];
                    $scope.response[moduleYIndex - 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('q=swap_modules&upper=' + (moduleYIndex - 1));
                };
                $scope.down = function (module) {
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex + 1];
                    $scope.response[moduleYIndex + 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('q=swap_modules&upper=' + moduleYIndex);
                };
                $scope.isSynced = function () {
                    return syncQueue.isSynced();
                };
            }
        };
    });
