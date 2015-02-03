'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:CafeCtrl
 * @description
 * # CafeCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('CafeCtrl', function ($scope) {
        $scope.response = [];
        $scope.response[0] = {};
        $scope.response[1] = {};
        $scope.response[0].data = {};
        $scope.response[1].data = {};
        $scope.response[0].type = 'parallax-module';
        $scope.response[0].data.title = 'Grillplatz im Nachtigallental';
        $scope.response[0].data.caption = 'Ein ungeheim spaßiger Spaß für die ganze Familie';
        $scope.response[1].type = 'text-module';
        $scope.response[1].data.title = 'Unser Grillplatz';
        $scope.response[1].data.content = 'Hier steht ein Text<br> über den Grillplatz<div style="height: 700px"></div>';
        $scope.response[2] = {};
        $scope.response[2].data = {};
        $scope.response[2].type = 'parallax-module';
        $scope.response[2].data.title = 'Hier ist ein Titel';
        $scope.response[2].data.caption = 'Das ist ja toll <br> lalala';
    });
