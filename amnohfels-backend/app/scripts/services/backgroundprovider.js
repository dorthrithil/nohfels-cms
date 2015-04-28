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
        var userInfoResource = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=84b58eae00efe43e7047d04170c781c6&format=json&nojsoncallback=1&user_id=';
        var photoURL = '';
        var owner = '';

        //gets the list of favourites from flickr
        //returns a promise
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

        //gets called on construction
        var init = function () {
            getPublicList().then(function (response) {
                if (response.stat !== 'fail') {
                    owner = response.photos.photo[0].owner;
                    photoURL = mapUrlLink(response.photos.photo[0]);
                    setBackground();
                } else {
                    setDefaultBackground(); //flickr api error
                }
            }, function () {
                setDefaultBackground(); //http error
            });
        };

        //default background image in case the api call wasn't successful
        function setDefaultBackground() {
            owner = '66027905@N04';
            photoURL = 'https://farm8.staticflickr.com/7657/17090983308_35da1f247e_h.jpg'; //default as fallback for errors in flickr api requests
            setBackground();
        }

        //maps the photo object to a flickr photo link
        function mapUrlLink(photo) {
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
        }

        //sets the new background image and appends the credit link
        function setBackground() {
            var body = angular.element($document[0].body);
            body.css({'background-image': 'url(' + photoURL + ')'});
            var credit = angular.element('<div class="flickr-credit"></div>');
            body.append(credit);
            //set credit
            $http.get(userInfoResource + owner)
                .success(function (response) {
                    if (response.stat !== 'fail') {
                        credit.html('<a href="http://www.flickr.com/photos/' + owner + '">by ' + response.person.realname._content + '</a>');
                    } else {
                        credit.html('<a href="http://www.flickr.com/photos/' + owner + '">credit</a>'); //flickr api error
                    }
                })
                .error(function () {
                    credit.html('<a href="http://www.flickr.com/photos/' + owner + '">credit</a>'); //http error
                });
        }

        init();

    });