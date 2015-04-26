'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.doorman
 * @description
 * # doorman
 * Service in the amnohfelsBackendApp.
 */

//TODO comment

angular.module('amnohfelsBackendApp')
    .service('doorman', function doorman($http, phpServerRoot, $q, $timeout, $location) {
        var loggedIn = false;
        var jwt = false;
        var exp = false;

        this.isLoggedIn = function () {
            if (loggedIn) {
                return true;
            }
            if (retrieveAuthInfo()) { //is the authInfo string stored in local storage?
                var authInfo = retrieveAuthInfo();
                jwt = authInfo.jwt;
                exp = authInfo.exp;
                if (jwtIsExpired()) { //is the expiry date over?
                    return false;
                }
                setAuthInfoRefreshTimeout();
                loggedIn = true; //user is logged in with older jwt
                return true;
            }
            return false;
        };

        this.login = function (email, password) {
            var data = {
                email: email,
                password: password
            };
            return $q(function (resolve, reject) {
                $http.post(phpServerRoot + '/api/auth/request', data) //TODO api has to go to phpServerRoot
                    .success(function (response) {
                        jwt = response.jwt;
                        exp = response.exp;
                        setAuthInfoRefreshTimeout();
                        storeAuthInfo(response);
                        loggedIn = true;
                        resolve();
                    })
                    .error(function (response) {
                        logoutUser();
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

        //TODO is it really not possible to call this.logout inside this service? ()then i wouldn't need to lougt functions
        //for internal calls
        var logoutUser = function () {
            storeAuthInfo(false);
            loggedIn = false;
            jwt = false;
        };

        //for external calls
        this.logout = function () {
            logoutUser();
            $location.path('/login');
        };

        var storeAuthInfo = function (info) {
            localStorage.authInfo = JSON.stringify(info);
        };

        var retrieveAuthInfo = function () {
            return localStorage.authInfo ? JSON.parse(localStorage.authInfo) : false;
        };

        var jwtIsExpired = function () {
            return Math.floor(Date.now() / 1000) > exp;
        };

        var refreshJWT = function () {
            $http.post(phpServerRoot + '/api/auth/refresh', {jwt: jwt}) //TODO api has to go to phpServerRoot
                .success(function (response) {
                    jwt = response.jwt;
                    exp = response.exp;
                    setAuthInfoRefreshTimeout();
                    storeAuthInfo(response);
                    loggedIn = true;
                })
                .error(function () {
                    logoutUser();
                    //TODO error message
                });
        };

        //refreshes authInfo 5 seconds before expiry
        var refreshTimeoutPromise = null;
        var setAuthInfoRefreshTimeout = function () {
            if (refreshTimeoutPromise) {
                $timeout.cancel(refreshTimeoutPromise);
            }
            refreshTimeoutPromise = $timeout(refreshJWT, (exp - Math.floor(Date.now() / 1000) - 5) * 1000);
        };
    });
