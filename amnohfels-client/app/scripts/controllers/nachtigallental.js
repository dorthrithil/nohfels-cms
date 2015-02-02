'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:NachtigallentalCtrl
 * @description
 * # NachtigallentalCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('NachtigallentalCtrl', function ($scope) {
    $scope.sectionData = {};
    $scope.sectionData.para = {};
    $scope.sectionData.para2 = {};
    $scope.sectionData.textx = {};
    $scope.sectionData.para.title = 'Grillplatz im Nachtigallental';
    $scope.sectionData.para.caption = 'Ein ungeheim spaßiger Spaß für die ganze Familie';
    $scope.sectionData.para2.title = 'XXGrillplatz im NachtigallentalXX';
    $scope.sectionData.para2.caption = 'XXEin ungeheim spaßiger Spaß für die ganze FamilieXX';
    $scope.sectionData.textx.title = 'Unser Grillplatz';
    $scope.sectionData.textx.content = 'Hier steht ein Text über den Grillplatz';
  });
