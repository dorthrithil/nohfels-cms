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
                scope.confirmDeleteModule = function(index){
                    scope.confirmationModalData = {
                        performAction : function(){
                            scope.deleteModule(index);
                        },
                        title : 'Sind Sie sich sicher?',
                        text:'Wollen Sie das ' + scope.response[index].typeName + '-Modul "' + scope.response[index].data.title + '" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden!',
                        okButtonText:'Löschen',
                        dismissButtonText:'Abbrechen'
                    };
                    element.append($compile(angular.element('<confirmation-modal></confirmation-modal>'))(scope));
                };
            },
            controller: function ($scope) {
                $scope.refreshPageData = function(){
                    $http.get(phpServerRoot + '/index.php?q=page&topic=' + $scope.topic)
                        .success(function (response) {
                            $scope.response = response;
                        });
                };
                $scope.refreshPageData();
                $scope.$on('sq-http-request-successful', $scope.refreshPageData);
                $http.get(phpServerRoot + '/index.php?q=module_types')
                    .success(function (response) {
                        $scope.moduleTypes = response;
                    });
                $scope.up = function (module) {
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex - 1];
                    $scope.response[moduleYIndex - 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('get', 'q=swap_modules&upper=' + (moduleYIndex - 1));
                };
                $scope.down = function (module) {
                    var moduleYIndex = $scope.response.indexOf(module);
                    var moduleBuffer = $scope.response[moduleYIndex + 1];
                    $scope.response[moduleYIndex + 1] = module;
                    $scope.response[moduleYIndex] = moduleBuffer;
                    syncQueue.push('get', 'q=swap_modules&upper=' + moduleYIndex);
                };
                $scope.deleteModule = function(index){
                    syncQueue.push('delete', '/module/text/' + $scope.response[index].data.id);
                    $scope.response.splice(index, 1);
                };
                $scope.isSynced = function () {
                    return syncQueue.isSynced();
                };
            }
        };
    });
