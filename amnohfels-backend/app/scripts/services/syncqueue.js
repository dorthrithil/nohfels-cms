'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.syncQueue
 * @description
 * # syncQueue
 * Service in the amnohfelsBackendApp.
 */



angular.module('amnohfelsBackendApp')
    .service('syncQueue', function syncQueue(config, $http, $rootScope, doorman) {
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
                case 'get': //TODO i'm ot using this, am i?
                    $http.get(config + '/index.php?' + queue[0].query)
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
                    $http.delete(config.server.api + queue[0].query, {
                        headers :{
                            'JWT': doorman.getJWT()
                        }
                    })
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
                    $http.post(config.server.api + queue[0].query, queue[0].data,  {
                        headers :{
                            'JWT': doorman.getJWT()
                        }
                    })
                        .success(function () {
                            queue.shift();
                            if (queue.length !== 0) {
                                sync();
                            } else {
                                syncMutex = false;
                            }
                            $rootScope.$broadcast('sq-http-request-successful');
                        })
                        .error(function(response){
                            console.log(response);
                        });
                    break;
            }
        };
    });
