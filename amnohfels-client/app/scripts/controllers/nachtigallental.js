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
        $scope.response[0].data = {};
        $scope.response[0].type = 'parallax-module';
        $scope.response[0].data.title = 'Grillplatz im Nachtigallental';
        $scope.response[0].data.caption = 'Ein ungeheim spaßiger Spaß für die ganze Familie';
        $scope.response[0].data.bgImgSrc = 'images/parallax/grillplatz.jpg';

        $scope.response[1] = {};
        $scope.response[1].data = {};
        $scope.response[1].type = 'text-module';
        $scope.response[1].data.title = 'Unser Grillplatz';
        $scope.response[1].data.content = 'Hier steht ein Text<br> über den Grillplatz';

        $scope.response[2] = {};
        $scope.response[2].data = {};
        $scope.response[2].type = 'image-module';
        $scope.response[2].data.images = [
            {imageSize : 'large', imageThumbSrc : 'images/gallery/large.jpg', imageSrc : 'images/gallery/large.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery1.jpg', imageSrc : 'http://deelay.me/1000/http://media1.santabanta.com/full1/Outdoors/Landscapes/landscapes-267a.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery2.jpg', imageSrc : 'images/gallery/gallery2.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery3.jpg', imageSrc : 'images/gallery/gallery3.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery4.jpg', imageSrc : 'images/gallery/gallery4.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery5.jpg', imageSrc : 'images/gallery/gallery5.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery6.jpg', imageSrc : 'images/gallery/gallery6.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery7.jpg', imageSrc : 'images/gallery/gallery7.jpg'},
            {imageSize : 'small', imageThumbSrc : 'images/gallery/gallery8.jpg', imageSrc : 'images/gallery/gallery8.jpg'}
        ];

        $scope.response[3] = {};
        $scope.response[3].type = 'text-module';
        $scope.response[3].data = {};
        $scope.response[3].data.title = 'XXXUnser Grillplatztt';
        $scope.response[3].data.content = 'XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>XXXHier steht ein Text<br> über den Grillplatz<br>';

        $scope.response[4] = {};
        $scope.response[4].data = {};
        $scope.response[4].type = 'parallax-module';
        $scope.response[4].data.title = 'Hier ist ein Titel';
        $scope.response[4].data.caption = 'Das ist ja toll <br> lalala';
        $scope.response[4].data.bgImgSrc = 'images/parallax/sample2.jpg';
  });
