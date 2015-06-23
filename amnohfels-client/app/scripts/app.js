'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsClientApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */

//TODO (1.0.0) google analytics

//TODO (1.0.1) improvement: use ng resource for rest communication
//TODO (1.0.1) improvement: use different angular modules for different concerns
//TODO (1.0.1) tests: add tests
//TODO (1.0.1) documentation: add descriptions and comments to all functions and files

//TODO (1.1.0) feature: let user add, delete and disable pages
//TODO (1.1.0) improvement: factor out page style elements in extra files to provide theme functionality

angular
  .module('amnohfelsClientApp', ['ngRoute', 'akoenig.deckgrid', 'angularSpinner'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/cafe'
      })
      .when('/:pageTopic', {
        controller: 'DynamicLinkerCtrl',
        templateUrl: 'views/dynamiclinker.html'
      });
  });
