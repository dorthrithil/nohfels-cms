'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsBackendApp
 * @description
 * # amnohfelsBackendApp
 *
 * Main module of the application.
 */

//TODO (1.0.1) UI: check padding in content pane (e.g. when there is a 500 in page directive)
//TODO (1.0.1) improvement: use ng resource for rest communication
//TODO (1.0.1) improvement: use different angular modules for different concerns
//TODO (1.0.1) tests: add tests
//TODO (1.0.1) documentation: add descriptions and comments to all functions and files
//TODO (1.0.1) improvement: allow user to create new pages
//TODO (1.0.1) improvement: sort pages by header/footer position
//TODO (1.0.1) create submodules where it makes sense
//TODO (1.0.1) refactoring: put fileUploader filters in one place and inject them (parallax, employee, image)
//TODO (1.0.1) refactoring:  uniform comments (no inline comments)
//TODO (1.0.1) UI: directive for showing all error messages uniformly, eg. parallax (error + 1 different warnings)
//TODO (1.0.1) improvement: add page sorting & section functionality
//TODO (1.0.1) improvement: handly auto logout (JWTrefresh) with unsaved changes
//TODO (1.0.1) UI: warning if instagram module follows after parallax (looks generally ugly)
//TODO (1.0.1) bug: scenario: user opens image upload modal. does nothing until jwt is expired. jwt refreshes. modal does still have old jwt. user sends form while he is still logged in but gets a invalid token message

//TODO (1.0.2) enhancement: use HTML5 image preview instead of loading image from server after upload finished (parallax, employee, image)

angular
    .module('amnohfelsBackendApp', ['ngRoute', 'textAngularModule', 'coreModule', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])

    //configuration
    .config(function ($routeProvider) {
        //configure ngRoute
        $routeProvider
            .when('/login/:logoutReason?', {
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .when('/page/:pageTopic', {
                controller: 'DynamicLinkerCtrl',
                templateUrl: 'views/dynamiclinker.html'
            })
            .otherwise({
                templateUrl: 'views/welcome.html'
            });
    })

    //check for login & instantiate the backgroundProvider
    .run(function ($rootScope, $location, doorman) {
        //register listener to watch route changes
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!doorman.isLoggedIn()) {
                //no logged user, we should be going to #login
                if (next.templateUrl === 'views/login.html') {
                    //already going to #login, no redirect needed
                } else {
                    //not going to #login, we should redirect now
                    $location.path('/login');
                }
            }
        });
    });
