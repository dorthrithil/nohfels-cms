'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modal
 * @description
 * # modal
 */

//TODO (1.0.1) performance: destroy modal scopes on dismiss (need to be isolated)
//TODO (1.0.1) make === undefined a util function

//TODO (1.0.0) comment this

angular.module('amnohfelsBackendApp')
  .directive('modal', function ($compile, syncQueue, doorman, translations) {
    return {
      templateUrl: 'views/modal.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        switch (scope.modalVars.type.id) { //TODO (1.0.1) shorten this
          case 'gallery':
            element.find('.modal-body').append($compile(angular.element('<modal-gallery-form></modal-gallery-form>'))(scope));
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
          case 'youtube':
            element.find('.modal-body').append($compile(angular.element('<modal-youtube-form></modal-youtube-form>'))(scope));
            break;
          case 'maps':
            element.find('.modal-body').append($compile(angular.element('<modal-maps-form></modal-maps-form>'))(scope));
            break;
        }
        element.children().modal({backdrop: 'static'});
      },
      controller: function ($scope, $element) {
        $scope.errorMessages = translations.getErrorMessages();
        doorman.addUnsavedChange();
        $scope.save = function () {
          //TODO (1.0.1) improvement: factor out validation logic to validation directive
          $scope.form.$submitted = true;
          var tagsCondition = function(){
            if(typeof($scope.tagsValid) === 'undefined'){
              return true;
            } else {
              return $scope.tagsValid();
            }
          };
          var employeesCondition = function(){
            if(typeof($scope.employeesValid) === 'undefined'){
              return true;
            } else {
              return $scope.employeesValid();
            }
          };
          if ($scope.form.$valid && (typeof($scope.firstUploadFinished) === 'undefined' || $scope.firstUploadFinished) &&
            (typeof($scope.uploader) === 'undefined' || !$scope.uploader.isUploading) && tagsCondition() &&
          employeesCondition()) {
            //TODO (1.0.1) improvement: when syncQueue is containing promises, we can let the server respond with a single element which just was generated on create or update. we can add this to the model and skip updating the whole model like we do now
            switch ($scope.modalVars.action) {
              case 'create':
                syncQueue.push('post', 'module' + $scope.modalVars.route, $scope.modalVars.data, true);
                break;
              case 'update':
                syncQueue.push('post', 'module' + $scope.modalVars.route + '/' + $scope.modalVars.data.id, $scope.modalVars.data, true);
                break;
            }
            doorman.removeUnsavedChange();
            dismissModal();
            $element.children().modal('hide');
          }
        };

        $scope.cancel = function(){
          dismissModal();
        };

        /**
         * reset validation functions to undefined and invoke the dismiss hook function (used to unregister
         * textAngular editors)
         */
        function dismissModal(){
          $scope.employeesValid = undefined;
          $scope.tagsValid = undefined;
          if(typeof($scope.dismissHook) !== 'undefined'){
            $scope.dismissHook();
          }
          $scope.dismissHook = undefined;
        }
      }
    };
  });
