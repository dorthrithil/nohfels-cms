'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:chart
 * @description
 * # chart
 */
angular.module('amnohfelsBackendApp')
  .directive('chart', function () {
    return {
      templateUrl: 'views/chart.html',
      restrict: 'E',
      scope: {
        data: '=',
        weekendOffset :'='
      },
      link: function postLink(scope, element) {

        var context = jQuery('#chart', element).get(0).getContext('2d');
        var chart = new Chart(context); //jshint ignore:line
        var barChart;

        var render = function () {
          barChart = chart.Bar(scope.data);
          highlightWeekends(scope.weekendOffset);
        };

        var highlightWeekends = function(offset){
          offset = offset || 0;
          for(var i = 0; i < barChart.datasets[0].bars.length;i++){
            if((i - offset) % 7 === 0 || (i - offset) % 7 - 1 === 0){
              barChart.datasets[0].bars[i].fillColor = 'rgba(152,187,205,0.6)';
              barChart.datasets[0].bars[i].highlightFill = 'rgba(152,187,205,0.6)';
            }
          }
          barChart.update();
        };

        scope.$watchGroup(['data', 'weekendOffset'], function (values) {
          if (typeof values[0] !== 'undefined' && typeof values[1] !== 'undefined') {
            return render();
          }
        }, true);

      }
    };
  });
