'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.syncQueue
 * @description
 * # syncQueue
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
    .service('syncQueue', function syncQueue(phpServerRoot, $http, $rootScope, doorman) {
        var queue = [];
        var syncMutex = false;

        this.isSynced = function () {
            return queue.length === 0;
        };

        this.push = function (method, query, data) {
            //TODO set empty string default data
            queue.push({
                method: method,
                query: query, //TODO rename to route
                data: data
            });
            if (!syncMutex) {
                sync();
            }
        };

        var sync = function () {
            syncMutex = true;
            switch (queue[0].method) {
                case 'get':
                    $http.get(phpServerRoot + '/index.php?' + queue[0].query)
                        .success(function () {
                            queue.shift();
                            if (queue.length !== 0) {
                                sync();
                            } else {
                                syncMutex = false;
                            }
                        });
                    break;
                case 'delete':
                    $http.delete(phpServerRoot + '/api' + queue[0].query, {
                        headers :{
                            'JWT': doorman.getJWT()
                        }
                    }) //TODO api has to go to phpServerRoot
                        .success(function () {
                            queue.shift();
                            if (queue.length !== 0) {
                                sync();
                            } else {
                                syncMutex = false;
                            }
                            //TODO maybe better update the view asynchonically like in post requests?
                        });
                    break;
                case 'post':
                    $http.post(phpServerRoot + '/api' + queue[0].query, queue[0].data,  {
                        headers :{
                            'JWT': doorman.getJWT()
                        }
                    }) //TODO api has to go to phpServerRoot
                        .success(function () {
                            queue.shift();
                            if (queue.length !== 0) {
                                sync();
                            } else {
                                syncMutex = false;
                            }
                            $rootScope.$broadcast('sq-http-request-successful');
                        });
                    break;
            }
        };
    });
