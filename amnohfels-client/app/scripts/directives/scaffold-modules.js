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
        scope: {
            modules: '=scaffoldModules'
        },
        link: function (scope, element) {
            angular.forEach(scope.modules, function(value, key) {
                var compileStream = '';
                switch(value.type) {
                    case 'parallax-module':
                        compileStream += '<parallax-module data="modules[' + key + '].data"></parallax-module>';
                        break;
                    case 'text-module':
                        compileStream += '<text-module data="modules[' + key + '].data"></text-module>';
                        break;
                    default:
                        console.log('Err: No Match for ' + value.type + ' in inscaffoldModules.');
                }
                element.append($compile(compileStream)(scope));
            });
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