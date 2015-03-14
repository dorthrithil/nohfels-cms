'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:instagramModule
 * @description
 * # instagramModule
 */

//TODO allow mulitpile tags
//TODO allow all tags
//TODO filter tags out of caption
//TODO link to instagram page
//TODO heading
//TODO set maximum number of photos
//TODO allow max photos option as attribute
//TODO margin-top
//TODO $http error handling
//TODO check for token free photo fetching

angular.module('amnohfelsClientApp')
    .directive('instagramModule', function ($http, util) {
        return {
            templateUrl: 'views/instagram-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink() {
            },
            controller: function ($scope, $element) {
                var accessToken = '1693418525.1fb234f.fc30d26a0f214e83a5378cb56be78617&callback=JSON_CALLBACK';
                var requestUrl = 'https://api.instagram.com/v1/users/self/feed?access_token=' + accessToken;
                $scope.images = [];
                $http.jsonp(requestUrl)
                    .success(function (response) {
                        console.log(response);
                        for (var i = 0; i < response.data.length; i++) {
                            if (util.inArray(response.data[i].tags, $scope.data.filterForTag)) {
                                $scope.images.push({
                                    url : response.data[i].images.standard_resolution.url, //jshint ignore:line
                                    caption : response.data[i].caption.text
                                });
                            }
                        }
                    });

                $scope.next = function(){
                    $element.children().children().children().carousel('next');
                };
                $scope.previous = function(){
                    $element.children().children().children().carousel('prev');
                };
            }
        };
    });
