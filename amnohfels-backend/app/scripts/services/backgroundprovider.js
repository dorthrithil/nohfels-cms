'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.backgroundProvider
 * @description
 * # backgroundProvider
 * Service in the amnohfelsBackendApp.
 */

angular.module('amnohfelsBackendApp')
    .service('backgroundProvider', function backgroundProvider($http, $q, $document) {
        var publicListResource = 'https://api.flickr.com/services/rest/?method=flickr.favorites.getPublicList&api_key=84b58eae00efe43e7047d04170c781c6&user_id=66027905@N04&format=json&nojsoncallback=1';
        var photoURL = '';
        var getPublicList = function () {
            return $q(function (resolve, reject) {
                $http.get(publicListResource)
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function () {
                        reject('error while loading public flickr faves list');
                    });
            });
        };

        var init = function () {
            getPublicList().then(function (response) {
                photoURL = mapUrlLink(response.photos.photo[2]);
                setBackground();
            }, function () {
                photoURL = 'https://farm8.staticflickr.com/7657/17090983308_35da1f247e_h.jpg'; //default as fallback for errors in flickr api requests
                setBackground();
            });
        };

        function mapUrlLink(photo) {
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
        }

        function setBackground() {
            angular.element($document[0].body).css({'background-image': 'url(' + photoURL + ')'}); //TODO credit: https://www.flickr.com/photos/hieronymusahrens/10301971255/
        }

        init();

    });
