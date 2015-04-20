'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:module
 * @description
 * # module
 */

//TODO this should be named "page"
//TODO don't name it response in scope (standard angular variable name in http service is data)
//TODO better compile whole modal (pass type as argument), not only the forms. this way we can get the modal logic in the modal file. soc!
//TODO disable all buttons until syncqueue is finished (this would make a queue unnecessary)
//TODO synchronize button or deep copy of modalVars data object, because when i e.g. delete an employee in a staff module and close the modal without saving, the employee will still be deleted (at least in the clients view)
//TODO "loading the content failed - retry" button after some time without success
//TODO indicate loading of data

angular.module('amnohfelsBackendApp')
    .directive('module', function (phpServerRoot, $http, syncQueue, $compile, adminMail) {
        return {
            templateUrl: '/views/module.html',
            restrict: 'E',
            scope: {
                topic: '='
            },
            link: function postLink(scope, element) {
                scope.createModule = function (moduleType) {
                    scope.modalVars = {
                        type: moduleType,
                        action: 'new',
                        data : {}
                    };
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };
                scope.editModule = function (index) {
                    scope.modalVars = {
                        type: scope.response[index].type,
                        action: 'edit',
                        data: scope.response[index].data
                    };
                    element.append($compile(angular.element('<modal></modal>'))(scope));
                };
                scope.confirmDeleteModule = function (index) {
                    scope.confirmationModalData = {
                        performAction: function () {
                            scope.deleteModule(index);
                        },
                        title: 'Sind Sie sich sicher?',
                        text: 'Wollen Sie das ' + scope.response[index].type.name + '-Modul "' + scope.response[index].data.title + '" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden!',
                        okButtonText: 'Löschen',
                        dismissButtonText: 'Abbrechen'
                    };
                    element.append($compile(angular.element('<confirmation-modal></confirmation-modal>'))(scope));
                };
            },
            controller: function ($scope) {
                $scope.adminMail = adminMail; //for 404 alert
                $scope.refreshPageData = function () {
                    $http.get(phpServerRoot + '/api/page/' + $scope.topic)
                        .success(function (response, status) {
                            $scope.response = response;
                            $scope.status = status;
                        })
                        .error(function(response, status){
                            $scope.status = status;
                        });
                    //TODO error: "this page has no modules yet or an internal server error occured" => differentiate via status code
                };
                $scope.refreshPageData();
                $scope.$on('sq-http-request-successful', $scope.refreshPageData);
                $http.get(phpServerRoot + '/api/module/types')
                    .success(function (response) {
                        $scope.moduleTypes = response;
                    });
                $scope.up = function (module) { //TODO swap methods can be combined to a single swapWithLowerModule
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex - 1];
                    $scope.response[moduleYIndex - 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('post', '/module/swapwithlower/' + (moduleYIndex - 1));
                };
                $scope.down = function (module) {
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex + 1];
                    $scope.response[moduleYIndex + 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('post', '/module/swapwithlower/' + moduleYIndex);
                };
                $scope.deleteModule = function (index) {
                    syncQueue.push('delete', '/module/' + $scope.response[index].type.id + '/' + $scope.response[index].data.id); //TODO get real route (change module ids to ids without redundant _module suffix?)
                    $scope.response.splice(index, 1);
                };
                $scope.isSynced = function () {
                    return syncQueue.isSynced();
                };
            }
        }
            ;
    })
;
