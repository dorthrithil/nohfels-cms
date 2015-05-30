'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:backgroundSwitcher
 * @description
 * # backgroundSwitcher
 */

//TODO (1.0.1) UI: transition on switch background

angular.module('amnohfelsBackendApp')
    .directive('backgroundSwitcher', function ($http, $q, $document, $compile) {
        return {
            template: '',
            restrict: 'E',
            link: function postLink(scope, element) {
                var publicListResource = 'https://api.flickr.com/services/rest/?method=flickr.favorites.getPublicList&api_key=84b58eae00efe43e7047d04170c781c6&user_id=66027905@N04&format=json&nojsoncallback=1';
                var userInfoResource = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=84b58eae00efe43e7047d04170c781c6&format=json&nojsoncallback=1&user_id=';
                var photoURL = '';
                var owner = '';
                var index = 0;
                var publicPhotos = false;

                var body = angular.element($document[0].body);
                var credit = angular.element('<div class="flickr-credit"></div>');
                var switcher = angular.element('<div class="flickr-switcher"><span ng-click="previous()" class="caret-left"></span>&nbsp<span ng-click="next()" class="caret-right"></span></div>');
                $compile(switcher)(scope);

                // increments index and changes background to the corresponding image
                scope.next = function () {
                    index++;
                    if (index > publicPhotos.length - 1) {
                        index = 0;
                    }
                    switchBackground();
                };

                // decrements index and changes background to the corresponding image
                scope.previous = function () {
                    index--;
                    if (index < 0) {
                        index = publicPhotos.length - 1;
                    }
                    switchBackground();
                };

                // prepares background switch & calls setBackground
                function switchBackground() {
                    owner = publicPhotos[index].owner;
                    photoURL = mapUrlLink(publicPhotos[index]);
                    setBackground();
                }

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
                            publicPhotos = response.photos.photo;
                            owner = publicPhotos[index].owner;
                            photoURL = mapUrlLink(publicPhotos[index]);
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
                    body.css({'background-image': 'url(' + photoURL + ')'});
                    element.append(credit);
                    element.append(switcher);
                    //set credit
                    $http.get(userInfoResource + owner)
                        .success(function (response) {
                            if (response.stat !== 'fail') {
                                var creditName = (typeof response.person.realname !== 'undefined') ? response.person.realname._content : response.person.username._content;
                                credit.html('<a target="_blank" href="http://www.flickr.com/photos/' + owner + '">by ' + creditName + '</a>');
                            } else {
                                credit.html('<a target="_blank"  href="http://www.flickr.com/photos/' + owner + '">credit</a>'); //flickr api error
                            }
                        })
                        .error(function () {
                            credit.html('<a target="_blank"  href="http://www.flickr.com/photos/' + owner + '">credit</a>'); //http error
                        });
                }

                init();
            }
        };
    });
