'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.googleAPI
 * @description
 * # googleAPI
 * Service in the amnohfelsBackendApp.
 */

//TODO caching
//TODO comment

angular.module('amnohfelsBackendApp')
  .service('googleAPI', function googleAPI(config, $http, $q, util) {


    function getRequestJWT() {
      return $q(function (resolve, reject) {
        $http.get(config.server.api + 'googleauth')
          .then(function (response) {
            resolve(response.data.jwt);
          }, function () {
            reject('google auth request failed'); //TODO proper error handling
          });
      });
    }

    function getAccessToken(requestJWT) {
      return $q(function (resolve, reject) {

        var data = {
          'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: requestJWT
        };

        var config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: util.urlEncode
        };

        $http.post('https://www.googleapis.com/oauth2/v3/token', data, config)
          .then(function (response) {
            resolve(response.data.access_token); // jshint ignore:line
          }, function (response) {
            reject(response); //TODO proper error handling
          });

      });
    }

    this.getAnalyticsSessionHistory = function () {

      return $q(function (resolve, reject) {


        getRequestJWT().then(function (response) {
          getAccessToken(response).then(function (response) {

            var sessionHistoryRequestURL = 'https://www.googleapis.com/analytics/v3/data/ga?' +
              'ids=ga%3A104334484' +
              '&start-date=30daysAgo' +
              '&end-date=yesterday' +
              '&metrics=ga%3Asessions' +
              '&dimensions=ga%3Adate%2Cga%3AdayOfWeekName' +
              '&access_token=' + response;

            $http.get(sessionHistoryRequestURL).
              then(function (response) {
                resolve(response.data);
              }, function (response) {
                reject(response);//TODO proper error handling
              });

          });
        });
      });
    };

  });
