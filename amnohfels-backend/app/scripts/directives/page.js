'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:page
 * @description
 * # page
 */

//TODO (1.0.1) enhancement: better compile whole modal (pass type as argument), not only the forms. this way we can get the modal logic in the modal file. soc!
//TODO (1.0.1) enhancement: indicate loading of data
//TODO (1.0.1) enhancement: "loading the content failed - retry" button after some time without success


angular.module('amnohfelsBackendApp')
    .directive('page', function (config, $http, syncQueue, $compile) {
        return {
            templateUrl: 'views/page.html',
            restrict: 'E',
            scope: {
                topic: '='
            },
            link: function postLink(scope, element) {
                scope.createModule = function (moduleType) {
                    scope.modalVars = {
                        type: moduleType,
                        action: 'new',
                        data: {}
                    };
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };
                scope.editModule = function (index) {
                    scope.modalVars = {
                        type: scope.modules[index].type,
                        action: 'edit',
                        data: jQuery.extend(true, {}, scope.modules[index].data) //deep copy
                    };
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };
                scope.confirmDeleteModule = function (index) {
                    scope.confirmationModalData = {
                        performAction: function () {
                            scope.deleteModule(index);
                        },
                        title: 'Sind Sie sich sicher?',
                        text: 'Wollen Sie das ' + scope.modules[index].type.name + '-Modul "' + scope.modules[index].data.title + '" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden!',
                        okButtonText: 'Löschen',
                        dismissButtonText: 'Abbrechen'
                    };
                    element.append($compile(angular.element('<confirmation-modal></confirmation-modal>'))(scope));
                };
            },
            controller: function ($scope) {
                $scope.adminMail = config.admin.mail; //for 204 & >500 alerts
                $scope.refreshPageData = function () {
                    $http.get(config.server.api + 'page/' + $scope.topic)
                        .success(function (data, status) {
                            $scope.modules = data;
                            $scope.status = status;
                        })
                        .error(function (data, status) {
                            $scope.status = status;
                        });
                };
                $scope.refreshPageData();
                $scope.$on('sq-http-request-successful', $scope.refreshPageData);
                $http.get(config.server.api + 'module/types')
                    .success(function (data) {
                        $scope.moduleTypes = data;
                    });
                $scope.up = function (module) {
                    swapWithLower($scope.modules.indexOf(module) - 1);
                };
                $scope.down = function (module) {
                    swapWithLower($scope.modules.indexOf(module));
                };
                function swapWithLower(yIndex) {
                    var moduleBuffer = $scope.modules[yIndex + 1];
                    $scope.modules[yIndex + 1] = $scope.modules[yIndex];
                    $scope.modules[yIndex] = moduleBuffer;
                    var data = {
                        upper: yIndex,
                        topic: $scope.topic
                    };
                    syncQueue.push('post', 'module/swapwithlower', data);
                }

                $scope.deleteModule = function (index) {
                    syncQueue.push('delete', 'module/' + $scope.modules[index].type.id + '/' + $scope.modules[index].data.id); //TODO get real route (change module ids to ids without redundant _module suffix?)
                    $scope.modules.splice(index, 1);
                };
                $scope.isSynced = function () {
                    return syncQueue.isSynced();
                };
            }
        }
            ;
    })
;
