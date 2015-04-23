'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.doorman
 * @description
 * # doorman
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
  .service('doorman', function doorman() {
        var loggedIn = false;

        this.isLoggedIn = function(){
            return loggedIn;
        };

        this.login = function(email, password){
            //TODO request JWT here
            if(email === 'test@amnohfels.de' && password === 'password'){
                loggedIn = true;
            }
        };
  });
