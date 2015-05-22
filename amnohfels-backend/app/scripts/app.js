'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsBackendApp
 * @description
 * # amnohfelsBackendApp
 *
 * Main module of the application.
 */

//TODO http://localhost:9001/#/page/cafs should throw a 404

//TODO (1.0.0) update rangy to get rid of error

//TODO (1.0.1) improvement: use ng resource vor rest communication
//TODO (1.0.1) improvement: use different angular modules for different concerns
//TODO (1.0.1) tests: add tests
//TODO (1.0.1) documentation: add descriptions and comments to all functions and files
//TODO (1.0.1) improvement: allow user to create new pages
//TODO (1.0.1) improvement: sort pages by header/footer position
//TODO (1.0.1) refactoring: put fileUploader filters in one place and inject them (parallax, employee, image)

//TODO (1.0.2) enhancement: use HTML5 image preview instead of loading image from server after upload finished (parallax, employee, image)

angular
    .module('amnohfelsBackendApp', ['ngRoute', 'textAngular', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])

    //configuration
    .config(function ($routeProvider, $provide) {
        //configure textAngular
        $provide.decorator('taOptions', ['$compile', '$timeout', 'taRegisterTool', '$delegate', function ($compile, $timeout, taRegisterTool, taOptions) {
            //file upload tool
            taRegisterTool('fileupload', {
                tooltiptext: 'Upload a file to link to',
                iconclass: 'fa fa-upload',
                action: function () {
                    var button = jQuery('[name="fileupload"]'); //get button
                    var popoverContent = angular.element('<ta-fileupload-popover></ta-fileupload-popover>'); //create popover
                    var $buttonScope = button.scope();
                    $compile(popoverContent)($buttonScope); //compile it to the buttons scope
                    $timeout(function () {
                    }); //kick off $apply //TODO i think i don't need this anymore
                    button.popover({
                        content: popoverContent, //TODO optimise popover placement
                        placement: 'bottom',
                        container: 'body',
                        viewport: button,
                        html: true
                    });
                    button.popover('show');
                    var self = this; //for reference inside next function
                    $buttonScope.performAction = function () { //taFileuploadPopover calls this after finishing the upload
                        var urlLink = $buttonScope.taFileUploadAccessPath; //relative path - will be made absolute on client, this way links will still work when we change the environment
                        if (urlLink && urlLink !== '' && urlLink !== 'http://') { //wrap selection like in insertLink tool
                            button.popover('destroy'); //destroy popover
                            return self.$editor().wrapSelection('createLink', urlLink, true); //TODO only works every second time!!!!!!
                        }
                    };
                },
                activeState: function (commonElement) {
                    if (commonElement) {
                        return commonElement[0].href.indexOf('uploads/files/') !== -1; //TODO edit insertLink to not show activeState on uploaded links (=== -1 && a) + add tag test here
                    }
                    return false;
                }
            });
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['insertLink', 'fileupload']
            ];
            return taOptions;
        }]);

        //configure ngRoute
        $routeProvider
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .when('/page/:topic', {
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