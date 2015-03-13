'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:instagramModule
 * @description
 * # instagramModule
 */
angular.module('amnohfelsClientApp')
    .directive('instagramModule', function ($http) {
        return {
            templateUrl: 'views/instagram-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink(scope, element) {
                element.text('this is the instagramModule directive');
            },
            controller: function () {
                var accessToken = '1693418525.1fb234f.fc30d26a0f214e83a5378cb56be78617';
                var requestUri = 'https://api.instagram.com/v1/users/self/feed?access_token=' + accessToken;
                $http.get(requestUri)
                    .success(function (response) {
                        console.log(response);
                    });
            }
        };
    });
