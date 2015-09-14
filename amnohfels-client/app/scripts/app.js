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
      .when('/', {
        redirectTo: '/cafe'
      })
      .when('/:pageTopic', {
        controller: 'DynamicLinkerCtrl',
        templateUrl: 'views/dynamiclinker.html',
        resolve: {
          dataObject: function(preloadData) {
            return preloadData.getDataObject();
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
    $rootScope.$on('$routeChangeError', function(angularEvent, current, previous, rejection){
      if(rejection.status === 404) {
        $location.url('/404');
      }
      //TODO (1.0.1) handle other statuses
    });

    //TODO (1.0.1) think of a solution without broadcasts
    //$rootScope.$on('$routeChangeStart', function(angularEvent, current) {
    //  if (current.$$route && current.$$route.resolve) {
    //    $rootScope.$broadcast('show-page-loading-bar');
    //  }
    //});
    //$rootScope.$on('$routeChangeSuccess', function() {
    //  $rootScope.$broadcast('hide-page-loading-bar');
    //});
  });
