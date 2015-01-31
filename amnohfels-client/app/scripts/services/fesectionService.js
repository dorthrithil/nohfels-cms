'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.feSection
 * @description
 * # feSection
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('feSectionService', function feSectionService(phpServerRoot, $http) {
        var page = '/index.php';
        this.sectionData = {};
        $http.get(phpServerRoot + page)
            .success(function(response) {
                this.sectionData = response;
            });
        this.noData = function(){
            return (this.sectionData === undefined);
        };
  });
