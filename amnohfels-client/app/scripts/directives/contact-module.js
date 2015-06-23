'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:contactModule
 * @description
 * # contactModule
 */

//TODO (1.0.0) (bug) safari generates connection refused errors on successfully sent mails

angular.module('amnohfelsClientApp')
  .directive('contactModule', function ($http, config, $q, $timeout) {
    return {
      templateUrl: 'views/contact-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      link: {
        pre: function (scope, element) {
          //handle margin-top
          if(scope.firstModule){
            element.children().addClass('first-module');
          }
          //ng-change triggers this when the input value changes
          scope.contexts = [];
          scope.modelChanged = function (context) {
            scope.contexts.push(context);
            context.initiated = true; //true if model has at least one time changed - if not, no indication will be shown
            scope.$broadcast('toggleActiveAlerts');
          };
          //when submit button is pressed..
          scope.submit = function ($event) {
            scope.$broadcast('toggleAllAlerts'); //we toggle all alerts if necessary
            if (scope.contactForm.$valid) { //send form to server if form is valid
              scope.transferForm($event); //transfers form data to server
            }
          };
          //indicates, that we are waiting for the servers response
          scope.indicateSending = function (target) {
            if (scope.indicateSendingFlag === true) {
              target.html('Sende<span style="color: transparent">...</span>');
            }
            $timeout(function () {
              if (scope.indicateSendingFlag === true) {
                target.html('Sende.<span style="color: transparent">..</span>');
              }
            }, 300);
            $timeout(function () {
              if (scope.indicateSendingFlag === true) {
                target.html('Sende..<span style="color: transparent">.</span>');
              }
            }, 600);
            $timeout(function () {
              if (scope.indicateSendingFlag === true) {
                target.html('Sende...');
              }
            }, 900);
            $timeout(function () {
              if (scope.indicateSendingFlag === true) {
                scope.indicateSending(target); //reenter loop
              }
            }, 1200);
          };
        }
      },
      controller: function ($scope) {
        $scope.indicateSendingFlag = false;

        //default model for form data
        $scope.formData = {
          name: '',
          email: '',
          message: '',
          topic: $scope.data.topic
        };

        //alert texts
        $scope.resetContent = {
          title: 'Nachricht gesendet',
          text: 'Vielen Dank für Ihre Nachricht. Wir werden Ihnen schnellst möglich antworten.'
        };
        $scope.unknownSuccess = {
          title: 'Nachricht gesendet',
          text: 'Vielen Dank für Ihre Nachricht. Wir werden Ihnen schnellst möglich antworten.'
        };
        $scope.badRequest = {
          title: 'Anfrage fehlerhaft',
          text: 'Die Nachricht konnte nicht gesendet werden, da der Server eine fehlerhafte Anfrage meldet. Bitte versuchen Sie es erneut.'
        };
        $scope.requestTimeout = {
          title: 'Zeitüberschreitung',
          text: 'Die Nachricht konnte nicht gesendet werden, da der Server eine Zeitüberschreitung meldet. Bitte versuchen Sie es erneut.'
        };
        $scope.internalServerError = {
          title: 'Interner Server Fehler',
          text: 'Die Nachricht konnte nicht gesendet werden, da ein interner Server Fehler aufgetreten ist. Bitte versuchen Sie es erneut.'
        };
        $scope.connectionRefused = {
          title: 'Verbindung verweigert',
          text: 'Die Nachricht konnte nicht gesendet werden, da die Verbindung zum Server verweigert wurde. Bitte versuchen Sie es erneut.'
        };
        $scope.unknownError = {
          title: 'Ein unbekannter Fehler ist aufgetreten',
          text: 'Die Nachricht konnte nicht gesendet werden, da ein unbekannter Fehler aufgetreten ist. Bitte versuchen Sie es erneut.'
        };

        $scope.transferForm = function ($event) {

          $scope.event = $event; //form element
          var submitButton = angular.element($event.target).find('button[type=\'submit\']');

          //if response takes too long, indicate that we are waiting for response..
          $scope.indicateSendingFlag = true;
          $timeout(function () {
            $scope.indicateSending(submitButton);
          }, 200);

          //get modal element
          var modal = angular.element($event.target).next().children();

          //send data
          $http.post(config.server.api + 'mail', $scope.formData)
            .success(function (data, status) {
              console.log(data);
              //switch success cases
              switch (status) {
                case 205:
                  $scope.modal = $scope.resetContent;
                  $scope.formData = {
                    name: '',
                    email: '',
                    message: '',
                    topic: $scope.data.topic
                  };
                  break;
                default:
                  $scope.modal = $scope.unknownSuccess;
              }
              $scope.modal.status = 'success'; //for modal color
              for (var i = 0; i < $scope.contexts.length; i++) { //reset indications
                $scope.contexts[i].initiated = false;
              }
              $scope.$broadcast('resetAllAlerts'); //reset alerts
              $scope.indicateSendingFlag = false; //stop indicating loop
              submitButton.html('Absenden'); //reset submit button text
              modal.modal(); //toggle server response modal
            })
            .error(function (data, status) {
              //switch error cases
              console.log(data);
              console.log('status: ' + status);
              switch (status) {
                case 0:
                  $scope.modal = $scope.connectionRefused;
                  break;
                case 400:
                  $scope.modal = $scope.badRequest;
                  break;
                case 408:
                  $scope.modal = $scope.requestTimeout;
                  break;
                case 500:
                  $scope.modal = $scope.internalServerError;
                  break;
                default:
                  $scope.modal = $scope.unknownError;
              }
              $scope.modal.status = 'error'; //for modal color
              $scope.indicateSendingFlag = false; //stop indicating loop
              submitButton.html('Absenden'); //reset submit button text
              modal.modal(); //toggle server response modal
            });
        };

        $scope.resend = function ($event) {
          var modal = angular.element($event.target).next().children(); //modal dom element
          modal.modal('hide'); //hide modal
          modal.on('hidden.bs.modal', function () { //when modal hide animation ends...
            modal.unbind('hidden.bs.modal'); //unbind event
            $scope.transferForm($event); //and reenter transfer function
          });
        };
      }
    };
  });
