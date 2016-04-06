'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
  .controller('WelcomeCtrl', function ($scope, googleAPI, weatherService) {

    //TODO (1.0.0) comment
    //TODO (1.0.0) weather hidden for standard?
    //TODO (1.0.0) different charts in different directives

    $scope.analyticsData = null;
    $scope.weatherHistoryData = null;

    var analyticsDataPromise = googleAPI.getAnalyticsSessionHistory();
    var weatherHistoryPromise = weatherService.getWeatherHistory();

    weatherHistoryPromise.then(function (response) {

      var dates = [], temperatures = [];

      for (var i = 0; i < response.length; i++) {
        dates.push(
          response[i].summary.ymd.toString().substr(6, 2) + '.' +
          response[i].summary.ymd.toString().substr(4, 2) + '.' +
          response[i].summary.ymd.toString().substr(0, 4)
        );
        temperatures.push(response[i].summary.temp.maxC);
      }

      $scope.weatherHistoryData = {
        labels: dates,
        datasets: [
          {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: temperatures
          }
        ]
      };

    });

    analyticsDataPromise.then(function (response) {
      var dates = [], sessions = [], daynames = [];

      for (var i = 0; i < response.rows.length; i++) {
        dates.push(
          response.rows[i][0].substr(6, 2) + '.' +
          response.rows[i][0].substr(4, 2) + '.' +
          response.rows[i][0].substr(0, 4)
        );
        daynames.push(response.rows[i][1]);
        sessions.push(response.rows[i][2]);
      }

      $scope.weekendOffset = daynames.indexOf('Saturday');

      $scope.analyticsData = {
        labels: dates,
        datasets: [
          {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: sessions
          }
        ]
      };

    });

  });
