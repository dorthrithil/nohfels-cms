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
                title: 'Sommercafé am Nohfels'
            },
            type: 'parallax-module'
        };

        $scope.response[1] = {
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

        $scope.response[3] = {
            data: {},
            type: 'contact-module'
        };

        $scope.response[2] = {
            data: {
                caption: 'Mo-Fr: 13:00-19:00 Uhr<br /> Sa+So: 12:00-19:00 Uhr',
                bgImgSrc: 'images/parallax/kuchen.jpg',
                title: 'Öffnungszeiten'
            },
            type: 'parallax-module'
        };

        $scope.response[4] = {
            data: {
                filterForTag: ['café', 'cafe'],
                maxPhotos: 10,
                filterOutTags: true
            },
            type: 'instagram-module'
        };


//        $scope.response[0] = {};
//        $scope.response[1] = {};
//        $scope.response[1].data = {};
//        $scope.response[1].type = 'this shouldn't exist';
    });
