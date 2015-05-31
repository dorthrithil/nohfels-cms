'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modal
 * @description
 * # modal
 */

//TODO (1.0.1) performance: destroy modal scopes on dismiss (need to be isolated)

angular.module('amnohfelsBackendApp')
    .directive('modal', function ($compile, syncQueue, doorman) {
        return {
            templateUrl: 'views/modal.html',
            restrict: 'E',
            link: function postLink(scope, element) {
                switch (scope.modalVars.type.id) {
                    case 'image':
                        element.find('.modal-body').append($compile(angular.element('<modal-image-form></modal-image-form>'))(scope));
                        break;
                    case 'parallax':
                        element.find('.modal-body').append($compile(angular.element('<modal-parallax-form></modal-parallax-form>'))(scope));
                        break;
                    case 'text':
                        element.find('.modal-body').append($compile(angular.element('<modal-text-form></modal-text-form>'))(scope));
                        break;
                    case 'contact':
                        element.find('.modal-body').append($compile(angular.element('<modal-contact-form></modal-contact-form>'))(scope));
                        break;
                    case 'staff':
                        element.find('.modal-body').append($compile(angular.element('<modal-staff-form></modal-staff-form>'))(scope));
                        break;
                    case 'instagram':
                        element.find('.modal-body').append($compile(angular.element('<modal-instagram-form></modal-instagram-form>'))(scope));
                        break;
                }
                element.children().modal({backdrop: 'static'});
            },
            controller: function($scope, $element){
                doorman.addUnsavedChange();
                $scope.save = function(){
                    //TODO (1.0.1) improvement: when syncQueue is containing promises, we can let the server respond with a single element which just was generated on create or update. we can add this to the model and skip updating the whole model like we do now
                    switch($scope.modalVars.action){
                        case 'create':
                            syncQueue.push('post', 'module' + $scope.modalVars.route, $scope.modalVars.data, true);
                            break;
                        case 'update':
                            syncQueue.push('post', 'module' + $scope.modalVars.route + '/' + $scope.modalVars.data.id, $scope.modalVars.data, true);
                            break;
                    }
                    doorman.removeUnsavedChange();
                    $element.children().modal('hide');
                };
            }
        };
    });