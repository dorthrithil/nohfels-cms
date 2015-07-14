'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.topicService
 * @description
 * # topicService
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('topicService', function topicService(config, $http, $q) {
    //request topics
    var topicsPromise = $http.get(config.server.api + 'topic');

    this.getHeadTopics = function(){
      return $q(function(resolve) {
        topicsPromise.success(function(response){
          resolve(response.head);
        });
      });
    };

    this.getFootTopics = function(){
      return $q(function(resolve) {
        topicsPromise.success(function(response){
          resolve(response.foot);
        });
      });
    };

  });
