'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.syncQueue
 * @description
 * # syncQueue
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
  .service('syncQueue', function syncQueue(phpServerRoot, $http) {
        var queue = [];
        var syncMutex = false;

        this.isSynced = function(){
            return queue.length === 0;
        };

        this.push = function(q){
            queue.push(q);
            if(!syncMutex){
                sync();
            }
        };

        var sync = function(){
            syncMutex = true;
            $http.get(phpServerRoot + '/index.php?' + queue[0])
                .success(function () {
                    queue.shift();
                    if(queue.length !== 0){
                        sync();
                    } else {
                        syncMutex = false;
                    }
                });
        };
  });
