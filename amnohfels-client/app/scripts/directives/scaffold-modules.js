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
        var moduleTypes = [
          'contact',
          'text',
          'staff',
          'gallery',
          'parallax',
          'instagram',
          'youtube',
          'maps',
          'infotile'
        ];

        //TODO handle firstmodule and lastmodule flags (last module style exists but is not added in yet. it is e.g. needed in a parallax module when nothing else follows)

        scope.$on('compile-modules', function () {
          var compileStream = '';
          angular.forEach(scope.pageData, function (value, key) {
            if (value.type !== undefined && moduleTypes.indexOf(value.type.id) !== -1) {
              compileStream += '<' + value.type.id + '-module key="' + key + '" data="pageData[' + key +
                '].data" first-module="' + (key === 0) + '"></' + value.type.id + '-module>';
            } else {
              compileStream += '<error-module data=""><h3>Error 400: Bad Request</h3><p>Es konnte kein passendes ' +
                'Modul zur Anfrage gefunden werden.</p></error-module>'; //TODO (1.0.1) proper error messages
            }
          });
          element.append($compile(compileStream)(scope));
        });

        scope.$on('status404', function () {
          var status404 = angular.element('<status404></status404>');
          element.append($compile(status404)(scope));
        });
      }
    };
  });
