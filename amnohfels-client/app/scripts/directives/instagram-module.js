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
            link: function postLink() {
            },
            controller: function ($scope) {
                var accessToken = '1693418525.1fb234f.fc30d26a0f214e83a5378cb56be78617&callback=JSON_CALLBACK';
                var requestUrl = 'https://api.instagram.com/v1/users/self/feed?access_token=' + accessToken;
                $scope.images = [];
                return $http.jsonp(requestUrl)
                    .success(function (response) {
                        for(var i = 0; i < response.data.length; i++){
                            $scope.images.push(response.data[i].images.standard_resolution.url); //jshint ignore:line
                        }
                        console.log($scope.images);
                    });
            }
        };
    });
