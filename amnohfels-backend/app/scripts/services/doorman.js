'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.doorman
 * @description
 * # doorman
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
    .service('doorman', function doorman($http, phpServerRoot, $q) {
        var loggedIn = false;
        var jwt = '';

        this.isLoggedIn = function () {
            return loggedIn;
        };

        this.login = function (email, password) {
            var data = {
                email: email,
                password: password
            };
            return $q(function(resolve, reject) {
                $http.post(phpServerRoot + '/api/auth/request', data) //TODO api has to go to phpServerRoot
                    .success(function (response) {
                        jwt = response;
                        loggedIn = true;
                        resolve();
                    })
                    .error(function (response) {
                        reject(response);
                    });
            });
        };

        this.getJWT = function () {
            if (jwt !== '' && loggedIn) {
                return jwt;
            } else {
                return false;
            }
        };

        this.logout = function(){
            loggedIn = false;
            jwt = '';
        };
    });
