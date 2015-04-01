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

        $scope.response[0] = {
            data: {
                caption: 'Ein Stück Schweden in Bad Sobernheim',
                bgImgSrc: 'images/parallax/cafe.jpg',
                title: 'Sommercafé am Nohfels',
                height: '100vh'
            },
            type: 'parallax-module'
        };

        $scope.response[1] = {
            type: 'text-module',
            data: {
                title: 'Unser Angebot',
                content: 'Kaffee, Kuchen und Waffeln nach Hausfrauenart, Eisbecher, eine große Auswahl alkoholfreier Getränke, Wein von heimischen Winzern, Kirner Bier und vieles mehr.'
            }};

        $scope.response[2] = {
            type: 'image-module',
            data: {
                images: [
                    {imageSize: 'large', imageThumbSrc: 'images/gallery/cafe/1.jpg', imageSrc: 'images/gallery/cafe/1.jpg'},
                    {imageSize: 'small', imageThumbSrc: 'images/gallery/cafe/2.jpg', imageSrc: 'images/gallery/cafe/2.jpg'},
                    {imageSize: 'small', imageThumbSrc: 'images/gallery/cafe/3.jpg', imageSrc: 'images/gallery/cafe/3.jpg'},
                    {imageSize: 'small', imageThumbSrc: 'images/gallery/cafe/4.jpg', imageSrc: 'images/gallery/cafe/4.jpg'},
                    {imageSize: 'small', imageThumbSrc: 'images/gallery/cafe/5.jpg', imageSrc: 'images/gallery/cafe/5.jpg'},
                    {imageSize: 'small', imageThumbSrc: 'images/gallery/cafe/6.jpg', imageSrc: 'images/gallery/cafe/6.jpg'}
                ]
            }
        };

        $scope.response[3] = {
            data: {
                caption: 'Mo-Fr: 13:00-19:00 Uhr<br /> Sa+So: 12:00-19:00 Uhr',
                bgImgSrc: 'images/parallax/kuchen.jpg',
                title: 'Öffnungszeiten',
                height: '500px'
            },
            type: 'parallax-module'
        };

        $scope.response[4] = {
            type: 'staff-module',
            data: {
                title: 'Unser Team',
                images: [
                    {imageSrc: 'images/staff/uwe.jpg',
                        caption: 'Uwe Engelmann'},
                    {imageSrc: 'images/staff/lukas.jpg',
                        caption: 'Lukas Engelmann'},
                    {imageSrc: 'images/staff/marina.jpg',
                        caption: 'Marina Weidemaier'},
                    {imageSrc: 'images/staff/eva.jpg',
                        caption: 'Eva Becker'},
                    {imageSrc: 'images/staff/veronika.jpg',
                        caption: 'Veronika Scheffold'},
                    {imageSrc: 'images/staff/lisa.jpg',
                        caption: 'Lisa Bachmann'}
                ]
            }
        };

        $scope.response[5] = {
            data: {
                topic : 'cafe'
            },
            type: 'contact-module'
        };

        $scope.response[6] = {
            data: {
                filterForTags: ['café', 'cafe'],
                maxPhotos: 10,
                filterOutTags: true
            },
            type: 'instagram-module'
        };

    });
