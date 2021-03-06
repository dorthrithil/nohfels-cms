'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsClientApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */

//TODO (1.0.1) bug: analytics: filter out "/" path as it always gets redirected immediately
//TODO (1.0.1) show dummys for unresolved images
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
        redirectTo: '/testseite'
      })
      // standard page logic
      .when('/:pageTopic', {
        controller: 'DynamicLinkerCtrl',
        templateUrl: 'views/dynamiclinker.html',
        resolve: {
          data: function(preload) {
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
  // inject analytics for automatic page tracking
  .run(function (Analytics, $anchorScroll) { //jshint ignore:line
    $anchorScroll.yOffset = 66; // Scolls an extra of 66px. The value has to match the navbar height!
  });

