'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.doorman
 * @description
 * # doorman
 * Service in the amnohfelsBackendApp.
 */

angular.module('coreModule')
    .service('doorman', function doorman($http, config, $q, $timeout, $location) {
        var loggedIn = false;
        var jwt = false;
        var exp = false;
        var self = this;

        //returns true if user is logged in
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

        //logs in user, returns a promise
        this.login = function (email, password) {
            return $q(function (resolve, reject) {
                $http.get(config.server.api + 'auth/request', {headers: {
                    'CREDENTIALS': email + ':' + password //deliver credentials as http header
                }}) //get auth request
                    .success(function (response) { //store authInfo and resolve
                        jwt = response.jwt;
                        exp = response.exp;
                        setAuthInfoRefreshTimeout();
                        storeAuthInfo(response);
                        loggedIn = true;
                        resolve();
                    })
                    .error(function (response) { //cautions logout & reject
                        if (response === 'badLoginCredentials') {
                            // logout with reason
                            self.hardLogout('badLoginCredentials');
                        } else {
                            //logout without reason
                            self.hardLogout();
                        }
                        reject();
                    });
            });
        };

        //returns jwt to send with an http request for authentication
        this.getJWT = function () {
            if (jwt !== '' && loggedIn) {
                return jwt;
            } else {
                return false;
            }
        };

        //logs out user with unsaved changes check
        this.logout = function () {
            return $q(function (resolve, reject) {
                if (unsavedChanges > 0) {
                    reject();
                } else {
                    resolve();
                    self.hardLogout();
                }
            });
        };

        //logs out user without unsaved changes check
        this.hardLogout = function (reason) {
            reason = reason || 'standardLogout';
            unsavedChanges = 0; //reset unsaved changes
            localStorage.removeItem('authInfo');
            loggedIn = false;
            jwt = false;
            $timeout.cancel(refreshTimeoutPromise); //cancel refresh timeout, so we don't get a 401 after the delay
            var reasonParameter = (reason === 'standardLogout') ? '' : '/' + reason; //used for displaying the logout reason to the user
            $location.path('/login' + reasonParameter); //route to login page
        };

        //stores authInfo object as json in localStorage
        var storeAuthInfo = function (info) {
            localStorage.authInfo = JSON.stringify(info);
        };

        //parses stringified authInfo object from localStorage
        var retrieveAuthInfo = function () {
            return localStorage.authInfo ? JSON.parse(localStorage.authInfo) : false;
        };

        //returns true if expiry date of jwt is over
        var jwtIsExpired = function () {
            return Math.floor(Date.now() / 1000) > exp;
        };

        //refreshes jwt (requests new jwt from server by posting the actual active one)
        var refreshJWT = function () {
            $http.post(config.server.api + 'auth/refresh', {jwt: jwt})
                .success(function (response) { //replace all authInfo with new token
                    jwt = response.jwt;
                    exp = response.exp;
                    setAuthInfoRefreshTimeout();
                    storeAuthInfo(response);
                    loggedIn = true;
                })
                .error(function () {
                    self.hardLogout('refreshJWTError');
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

        //track unsaved changes to warn user when he tries to log out with unsaved changes
        var unsavedChanges = 0;
        this.addUnsavedChange = function () {
            unsavedChanges++;
        };
        this.removeUnsavedChange = function () {
            if (unsavedChanges > 0) {
                unsavedChanges--;
            }
        };
        this.resetUnsavedChanges = function () {
            unsavedChanges = 0;
        };
    });
