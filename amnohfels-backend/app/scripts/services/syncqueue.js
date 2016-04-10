'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.syncQueue
 * @description
 * # syncQueue
 * Synchronises the model with the server
 */

//TODO (1.0.1) enhancement: push promises on stack to simplify error handling and model updating

angular.module('amnohfelsBackendApp')
    .service('syncQueue', function syncQueue(config, $http, $rootScope, doorman) {
        var queue = [];
        var syncMutex = false;

        /**
         * returns true if view and server are in sync (queue is empty)
         * @returns {boolean}
         */
        this.isSynced = function () {
            return queue.length === 0;
        };

        /**
         * Pushes a new job on the queue
         * @param {String} method - HTTP method, "delete" or "post"
         * @param {String} route - The relative route to the servers API
         * @param {Object} [data] - The data which will be passed to the server
         * @param {Boolean} critical: indicates that an immediate
         * model sync with server is necessary after successful HTTP call TODO (1.0.1) see above, will be obsolete
         */
        this.push = function (method, route, data, critical) {
          data = data || {};
            critical = critical || false;
            queue.push({
                method: method,
                route: route,
                data: data,
                critical: critical
            });
            // increment unsaved changes counter (for safe logout)
            doorman.addUnsavedChange();
            // when synchronisation hasn't already started, start it
            if (!syncMutex) {
                sync();
            }
        };

        /**
         * Synchronises a queue item with the server. Calls itself until queue is empty
         */
        var sync = function () {
            // lock function
            syncMutex = true;
            // security header for http calls
            var securityHeader = {
                headers: {
                    'JWT': doorman.getJWT()
                }
            };
            switch (queue[0].method) {
                // delete item from server
                case 'delete':
                  $http.delete(config.server.api + queue[0].route, securityHeader)
                        .success(function () {
                            successRoutine();
                        })
                        .error(function () {
                            errorRoutine();
                        });
                    break;
                // post item to server
                case 'post':
                    $http.post(config.server.api + queue[0].route, queue[0].data, securityHeader)
                        .success(function () {
                            successRoutine();
                        })
                        .error(function () {
                            errorRoutine();
                        });
                    break;
                // illegal method
                default:
                    console.warn('syncQueue: Illegal method "' + queue[0].method + '" used. Skipped job and proceeded with next.');
                    successRoutine();
            }
        };

        /**
         * Handles successful HTTP calls
         */
        var successRoutine = function () {
            // invoke model update on critical items //TODO (1.0.1) deprecated
            if (queue[0].critical){
                $rootScope.$broadcast('sq-update-model');
            }
            // Broadcast success
            $rootScope.$broadcast('sq-success');
            // remove item from queue
            queue.shift();
            // decrement unsaved changes counter
            doorman.removeUnsavedChange();
            // decide if we need to go on synchronising
            if (queue.length !== 0) {
                sync();
            } else {
                // if not, unlock queue
                syncMutex = false;
            }
        };

        /**
         * Handles unsuccessful HTTP calls
         */
        var errorRoutine = function () {
            // broadcast error - the app will get latest data from server
            // and unsynced changes will be thrown away
            $rootScope.$broadcast('sq-error');
            // reset queue
            queue = [];
            // reset unsaved changes
            doorman.resetUnsavedChanges();
        };
    });
