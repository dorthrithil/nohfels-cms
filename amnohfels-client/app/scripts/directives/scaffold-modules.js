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
                scope.$on('compile-modules', function () {
                    angular.forEach(scope.response, function (value, key) {
                        var compileStream = '';
                        var badRequest = false;
                        if (value.type !== undefined) {
                            switch (value.type.typeId) {
                                case 'parallax_module':
                                    compileStream += '<parallax-module first-module="' + (key === 0) + '" data="response[' + key + '].data"></parallax-module>';
                                    break;
                                case 'text_module':
                                    compileStream += '<text-module data="response[' + key + '].data"></text-module>';
                                    break;
                                case 'image_module':
                                    compileStream += '<image-module data="response[' + key + '].data"></image-module>';
                                    break;
                                case 'contact_module':
                                    compileStream += '<contact-module data="response[' + key + '].data"></image-module>';
                                    break;
                                case 'instagram_module':
                                    compileStream += '<instagram-module data="response[' + key + '].data"></instagram-module>';
                                    break;
                                case 'staff_module':
                                    compileStream += '<staff-module data="response[' + key + '].data"></staff-module>';
                                    break;
                                default:
                                    badRequest = true; //TODO error messages entsprechend
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