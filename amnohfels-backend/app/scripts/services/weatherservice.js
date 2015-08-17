'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.weatherService
 * @description
 * # weatherHistory
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
  .service('weatherService', function weatherService($q, $http, config) {

    //TODO client secret on client side is not the best idea

    var requestURL = 'http://api.aerisapi.com/observations/summary/' + config.aerisapi.placeId +
      '?from=-30days&plimit=30&client_id=' + config.aerisapi.clientId +
      '&client_secret=' + config.aerisapi.clientSecret;

    this.getWeatherHistory = function() {
      return $q(function (resolve, reject) {
        $http.get(requestURL)
          .then(function (response) {
            resolve(response.data.response[0].periods);
          }, function () {
            reject('aeris API request failed'); //TODO proper error handling
          });
      });
    };

  });
