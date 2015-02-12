'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:scaffoldModules
 * @description
 * # scaffoldModules
 */
angular.module('amnohfelsClientApp')
  .directive('scaffoldModules', function ($compile, $window) {
    var parallaxElementsCount = 0;
    var parallaxElementsLoaded = 0;
    var stellarInitialized = false;
    return {
        restrict: 'A',
        scope: {
            modules: '=scaffoldModules'
        },
        link: function (scope, element) {
            angular.forEach(scope.modules, function(value, key) {
                var compileStream = '';
                var badRequest = false;
                if (value.type !== undefined) {
                    switch (value.type) {
                        case 'parallax-module':
                            parallaxElementsCount++;
                            compileStream += '<parallax-module data="modules[' + key + '].data"></parallax-module>';
                            break;
                        case 'text-module':
                            compileStream += '<text-module data="modules[' + key + '].data"></text-module>';
                            break;
                        case 'image-module':
                            compileStream += '<image-module data="modules[' + key + '].data"></image-module>';
                            break;
                        default:
                            badRequest = true; //TODO error messages entsprechend
                    }
                } else {
                    badRequest = true;
                }
                if(badRequest){
                    compileStream += '<error-module data=""><h3>Error 400: Bad Request</h3><p>Es konnte kein passendes Modul zur Anfrage gefunden werden.</p></error-module>';
                }
                element.append($compile(compileStream)(scope));
            });
        },
        controller: function(){
            this.notifyElementLoaded = function(){
                parallaxElementsLoaded++;
                if (parallaxElementsCount !== 0 && parallaxElementsCount === parallaxElementsLoaded && stellarInitialized === false){
                    stellarInitialized = true;
                    angular.element($window).stellar({
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        verticalOffset: 51 //TODO why is this necessary to get rid of the weird background jumping bug?
                    });
                } else if (parallaxElementsCount !== 0 && parallaxElementsCount === parallaxElementsLoaded && stellarInitialized === true) {
                    angular.element($window).stellar('refresh');
                }
            };
        }
    };
  });



































//php

//
//angular.module('amnohfelsClientApp')
//    .service('feSectionService', function feSectionService(phpServerRoot, $http) {
//        var page = '/index.php';
//        this.sectionData = {};
//        $http.get(phpServerRoot + page)
//            .success(function(response) {
//                this.sectionData = response;
//            });
//        this.noData = function(){
//            return (this.sectionData === undefined);
//        };
//    });