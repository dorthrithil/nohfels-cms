'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:numberOnlyInput
 * @description
 * # numberOnlyInput
 * by GordyD at stackoverflow http://stackoverflow.com/questions/19036443/how-to-allow-only-a-number-digits-and-decimal
 *                            -point-to-be-typed-in-an-input/19037037#19037037
 */
angular.module('amnohfelsBackendApp')
  .directive('numberOnlyInput', function () {
    return {
      restrict: 'A',
      scope: {
        inputValue: '='
      },
      link: function (scope) {
        scope.$watch('inputValue', function(newValue,oldValue) {
          var arr = String(newValue).split('');
          if (arr.length === 0) {
            return;
          }
          if (arr.length === 1 && (arr[0] === '-' || arr[0] === '.' )) {
            return;
          }
          if (arr.length === 2 && newValue === '-.') {
            return;
          }
          if (isNaN(newValue)) {
            scope.inputValue = oldValue;
          }
        });
      }
    };
  });
