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
                pageTopic: '=pagetopic'
            },
            link: function postLink(scope, element) {

                // creates a new module
                scope.createModule = function (moduleType) {
                    // this data determines which modal in which state will be shown
                    scope.modalVars = {
                        type: moduleType,
                        action: 'create',
                        data: {}
                    };
                    // show modal
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };

                // lets the user update module data
                scope.updateModule = function (index) {
                    // this data determines which modal in which state will be shown
                    scope.modalVars = {
                        type: scope.modules[index].type,
                        action: 'update',
                        data: jQuery.extend(true, {}, scope.modules[index].data) //deep copy
                    };
                    // show modal
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };

                // asks is user is sure to delete the selected module
                scope.confirmDeleteModule = function (index) {
                    // this data determines which modal in which state will be shown
                    scope.confirmationModalData = {
                        // deletes the module
                        performAction: function () {
                            scope.deleteModule(index);
                        },
                        title: 'Sind Sie sich sicher?',
                        text: 'Wollen Sie das ' + scope.modules[index].type.name + '-Modul "' + scope.modules[index].data.title + '" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden!',
                        okButtonText: 'Löschen',
                        dismissButtonText: 'Abbrechen'
                    };
                    // show modal
                    element.append($compile(angular.element('<confirmation-modal></confirmation-modal>'))(scope));
                };
            },
            controller: function ($scope) {
                // for 204 & >500 alerts
                $scope.adminMail = config.admin.mail;

                // refreshes page data by server call
                $scope.refreshPageData = function () {
                    $http.get(config.server.api + 'page/' + $scope.pageTopic)
                        .success(function (data, status) {
                            $scope.modules = data;
                            $scope.status = status;
                        })
                        .error(function (data, status) {
                            // an alert will be shown in the view depending on the status code
                            $scope.status = status;
                        });
                };

                // refresh page data when syncQueue finished the request
                $scope.$on('sq-http-request-successful', $scope.refreshPageData);

                //functions for swapping module positions up & down
                $scope.up = function (module) {
                    swapWithLower($scope.modules.indexOf(module) - 1);
                };
                $scope.down = function (module) {
                    swapWithLower($scope.modules.indexOf(module));
                };
                function swapWithLower(yIndex) {
                    // prepare swap
                    var moduleBuffer = $scope.modules[yIndex + 1];
                    $scope.modules[yIndex + 1] = $scope.modules[yIndex];
                    $scope.modules[yIndex] = moduleBuffer;
                    var data = {
                        upper: yIndex,
                        topic: $scope.pageTopic
                    };

                    // push to syncQueue
                    syncQueue.push('post', 'module/swapwithlower', data);
                }

                // deletes a module
                $scope.deleteModule = function (index) {
                    syncQueue.push('delete', 'module/' + $scope.modules[index].type.id + '/' + $scope.modules[index].data.id); //TODO get real route (change module ids to ids without redundant _module suffix?)
                    $scope.modules.splice(index, 1); //TODO get new data from server instead of splicing around
                };

                // get sync status for coloring the save button
                $scope.isSynced = function () {
                    return syncQueue.isSynced();
                };

                // INIT

                // get page data..
                $scope.refreshPageData();

                // ..and module available types
                $http.get(config.server.api + 'module/types')
                    .success(function (data) {
                        $scope.moduleTypes = data;
                    });
            }
        };
    });
