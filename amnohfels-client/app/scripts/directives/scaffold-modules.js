'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:scaffoldModules
 * @description
 * # scaffoldModules
 */
angular.module('amnohfelsClientApp')
    .directive('scaffoldModules', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element) {
              //TODO (1.0.0) don't fetch data from util service
                scope.$on('compile-modules', function () {
                    angular.forEach(scope.response, function (value, key) {
                        var compileStream = '';
                        var badRequest = false;
                        if (value.type !== undefined) {
                            switch (value.type.id) {
                                case 'parallax':
                                    compileStream += '<parallax-module first-module="' + (key === 0) + '" data="response[' + key + '].data"></parallax-module>';
                                    break;
                                case 'text':
                                    compileStream += '<text-module data="response[' + key + '].data"></text-module>';
                                    break;
                                case 'image':
                                    compileStream += '<image-module data="response[' + key + '].data"></image-module>';
                                    break;
                                case 'contact':
                                    compileStream += '<contact-module data="response[' + key + '].data"></image-module>';
                                    break;
                                case 'instagram':
                                    compileStream += '<instagram-module data="response[' + key + '].data"></instagram-module>';
                                    break;
                                case 'staff':
                                    compileStream += '<staff-module data="response[' + key + '].data"></staff-module>';
                                    break;
                                default:
                                    badRequest = true; //TODO (1.0.1) proper error messages
                            }
                        } else {
                            badRequest = true;
                        }
                        if (badRequest) {
                            compileStream += '<error-module data=""><h3>Error 400: Bad Request</h3><p>Es konnte kein passendes Modul zur Anfrage gefunden werden.</p></error-module>';
                        }
                        element.append($compile(compileStream)(scope));
                    });
                });
            }
        };
    });
