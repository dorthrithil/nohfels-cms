'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modal
 * @description
 * # modal
 */

//TODO destroy modal scopes on dismiss (need to be isolated)

angular.module('amnohfelsBackendApp')
    .directive('modal', function ($compile, syncQueue) {
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
                $scope.save = function(){
                    switch($scope.modalVars.action){
                        case 'new':
                            syncQueue.push('post', 'module' + $scope.modalVars.route, $scope.modalVars.data);
                            break;
                        case 'edit':
                            syncQueue.push('post', 'module' + $scope.modalVars.route + '/' + $scope.modalVars.data.id, $scope.modalVars.data);
                            break;
                    }
                    $element.children().modal('hide');
                };
            }
        };
    });