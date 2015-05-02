'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:confirmationModal
 * @description
 * # confirmationModal
 */

//Usage:
//Put something like that in parent directive

//scope.confirmationModalData = {
//    performAction : function(){
//        scope.deleteModule(index);
//    },
//    title : 'Sind Sie sich sicher?',
//    text:'Wollen Sie XXX wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden!',
//    okButtonText:'Löschen',
//    dismissButtonText:'Abbrechen'
//};
//element.append($compile(angular.element('<confirmation-modal></confirmation-modal>'))(scope));


angular.module('amnohfelsBackendApp')
    .directive('confirmationModal', function () {
        return {
            templateUrl: 'views/confirmationmodal.html',
            restrict: 'E',
            link: function postLink(scope, element) {
                element.children().modal();
                scope.confirmationModalSubmitted = function () {
                    scope.confirmationModalData.performAction();
                    element.children().modal('hide');
                };
            }
        };
    });
