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
        $scope.response = [];
        $scope.response[0] = {};
        $scope.response[1] = {};
        $scope.response[0].data = {};
        $scope.response[1].data = {};
        $scope.response[0].type = 'parallax-module';
        $scope.response[0].data.title = 'XXXGrillplatz im Nachtigallental';
        $scope.response[0].data.caption = 'XXXEin ungeheim spaßiger Spaß für die ganze Familie';
        $scope.response[0].data.bgImgSrc = 'images/parallax/sample.jpg';
        $scope.response[1].type = 'text-module';
        $scope.response[1].data.title = 'XXXUnser Grillplatz';
        $scope.response[1].data.content = 'XXXHier steht ein Text<br> über den Grillplatz<div style="height: 700px"></div>';
        $scope.response[2] = {};
        $scope.response[2].data = {};
        $scope.response[2].type = 'parallax-module';
        $scope.response[2].data.title = 'XXXHier ist ein Titel';
        $scope.response[2].data.caption = 'XXXDas ist ja toll <br> lalala';
        $scope.response[2].data.bgImgSrc = 'images/parallax/sample2.jpg';
  });
