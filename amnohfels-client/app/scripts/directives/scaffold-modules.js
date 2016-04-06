'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:scaffoldModules
 * @description
 * # scaffoldModules
 */
angular.module('amnohfelsClientApp')
  .directive('scaffoldModules', function ($compile, util) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var moduleTypes = [
          'contact',
          'text',
          'staff',
          'gallery',
          'parallax',
          'instagram',
          'youtube',
          'maps',
          'infotile',
          'calendar'
        ];

        var nonBoxModuleTypes = [
          'parallax',
          'instagram'
        ];

        var spacer = '<div class="spacer"></div>';

        scope.$on('compile-modules', function () {
          var compileStream = '';

          function addSpacer(type, key) {
            if (key === 0 && !util.inStringArray(nonBoxModuleTypes, type)) {
              compileStream += spacer;
            } else if (key !== 0 && !(util.inStringArray(nonBoxModuleTypes, scope.pageData[key - 1].type.id) &&
              util.inStringArray(nonBoxModuleTypes, type))) {
              compileStream += spacer;
            }
          }

          angular.forEach(scope.pageData, function (value, key) {
            addSpacer(value.type.id, key);
            if (value.type !== undefined && moduleTypes.indexOf(value.type.id) !== -1) {
              compileStream += '<' + value.type.id + '-module key="' + key + '" data="pageData[' + key +
                '].data" first-module="' + (key === 0) + '"></' + value.type.id + '-module>';
            } else {
              compileStream += '<error-module data=""><h3>Error 400: Bad Request</h3><p>Es konnte kein passendes ' +
                'Modul zur Anfrage gefunden werden.</p></error-module>'; //TODO (1.0.1) proper error messages
            }
          });

          if (!util.inStringArray(nonBoxModuleTypes, scope.pageData[scope.pageData.length - 1].type.id)) {
            compileStream += spacer;
          }

          element.append($compile(compileStream)(scope));
        });

        // empty element when a routing error occured, as error messages are shown then
        scope.$on('$routeChangeError', function(){
           element.empty();
        });

      }
    };
  });
