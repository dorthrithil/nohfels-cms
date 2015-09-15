'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsClientApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */

//TODO (1.0.0) redesign 404 page

//TODO (1.0.1) security: keep config vars in a seperate yaml and fetch them for build
//TODO (1.0.1) improvement: use ng resource for rest communication
//TODO (1.0.1) improvement: use different angular modules for different concerns
//TODO (1.0.1) tests: add tests
//TODO (1.0.1) documentation: add descriptions and comments to all functions and files
//TODO (1.0.1) introduce translations service
//TODO (1.0.1) more advanced analytics

//TODO (1.1.0) feature: let user add, delete and disable pages
//TODO (1.1.0) improvement: factor out page style elements in extra files to provide theme functionality

angular
  .module('amnohfelsClientApp',
  [
    'ngRoute',
    'akoenig.deckgrid',
    'angularSpinner',
    'angular-google-analytics',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, AnalyticsProvider, config) {

    // config route provider

    $routeProvider
      // define starting page
      .when('/', {
        redirectTo: '/cafe'
      })
      // standard page logic
      .when('/:pageTopic', {
        controller: 'DynamicLinkerCtrl',
        templateUrl: 'views/dynamiclinker.html',
        resolve: {
          dataObject: function(preload) {
            return preload.getDataObject();
          }
        }
      });

    // config google analytics

    // initial configuration
    AnalyticsProvider.setAccount(config.analytics.id);
    // track all routes
    AnalyticsProvider.trackPages(true);
    // @if DEBUG
    // ..for testing on localhost
    AnalyticsProvider.setDomainName('none');
    // @endif
    // Use analytics.js instead of ga.js
    AnalyticsProvider.useAnalytics(true);

  })
  // inject analytics for automatic page tracking & set up 404 routing
  .run(function (Analytics, $rootScope, $location) { //jshint ignore:line
    // this gets fired, when the resolve in `routeProvider` is unsuccessful
    $rootScope.$on('$routeChangeError', function(angularEvent, current, previous, rejection){
      // most probably the reason is a 404
      if(rejection.status === 404) {
        $location.url('/404');
      }
      //TODO (1.0.1) handle other statuses
    });
  });
