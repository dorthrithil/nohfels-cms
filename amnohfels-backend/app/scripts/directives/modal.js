'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modal
 * @description
 * # modal
 */

//TODO replace data dismiss actions with own hide function and delete modal from dom

angular.module('amnohfelsBackendApp')
    .directive('modal', function ($compile, syncQueue) {
        return {
            templateUrl: 'views/modal.html',
            restrict: 'E',
            link: function postLink(scope, element) {
                switch (scope.modalVars.type.typeId) {
                    case 'image_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-image-form></modal-image-form>'))(scope));
                        break;
                    case 'parallax_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-parallax-form></modal-parallax-form>'))(scope));
                        break;
                    case 'text_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-text-form></modal-text-form>'))(scope));
                        break;
                    case 'contact_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-contact-form></modal-contact-form>'))(scope));
                        break;
                    case 'staff_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-staff-form></modal-staff-form>'))(scope));
                        break;
                    case 'instagram_module':
                        element.find('.modal-body').append($compile(angular.element('<modal-instagram-form></modal-instagram-form>'))(scope));
                        break;
                }
                element.children().modal({backdrop: 'static'});
            },
            controller: function($scope, $element){
                $scope.save = function(){
                    switch($scope.modalVars.action){
                        case 'new':
                            syncQueue.push('post', '/module/text', $scope.modalVars.data);
                            break;
                        case 'edit':
                            syncQueue.push('post', '/module/text/' + $scope.modalVars.data.id, $scope.modalVars.data);
                            break;
                    }
                    $element.children().modal('hide');
                };
            }
        };
    });