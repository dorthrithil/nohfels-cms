'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modal
 * @description
 * # modal
 */
angular.module('amnohfelsBackendApp')
    .directive('modal', function ($compile) {
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
            controller: function($scope){
                $scope.save = function(){
                    
                };
            }
        };
    });