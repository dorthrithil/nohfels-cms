'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:employee
 * @description
 * # employee
 */
angular.module('amnohfelsBackendApp')
    .directive('employee', function (phpServerRoot, FileUploader) {
        return {
            templateUrl: 'views/employee.html',
            restrict: 'E',
            scope: { //scope isolation to have different uploaders
                index: '=', //for displaying the different buddy icons
                data : '=' //passing the modalVars.data in
            },
            controller: function ($scope) {
                if ($scope.$parent.modalVars.action === 'new') {
                    $scope.imageSrc = '/images/user_icon_dummies/' + $scope.index % 3 + '.png'; //show dummy
                }
                if ($scope.$parent.modalVars.action === 'edit') { //TODO edit should be named update
                    $scope.imageSrc = phpServerRoot + '/' + $scope.data.imageSrc;
                }

                // FILE UPLOADER
                var uploader = $scope.uploader = new FileUploader({
                    url: phpServerRoot + '/api/upload', //POST requests get send here
                    autoUpload: true
                });

                // FILTERS
                //only image files
                uploader.filters.push({ //TODO show an error message
                    name: 'imageFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) { //jshint ignore:line
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });
                //restrict size
                uploader.filters.push({ //TODO show an error message
                    name: 'sizeFilter',
                    fn: function(item) {
                        return item.size < 4050218; //TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)
                    }
                });


                // CALLBACKS
                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) { //jshint ignore:line
                    //TODO error messages from filters go here
                };
                uploader.onAfterAddingFile = function (fileItem) {//jshint ignore:line
                    if (uploader.queue.length > 1){
                        uploader.removeFromQueue(0); //only one file should be in the queue for the progress bar getting displayed properly
                    }
                };
                uploader.onCompleteItem = function (fileItem, response, status, headers) {//jshint ignore:line
                    $scope.imageSrc = phpServerRoot + '/' + response.path; //show uploaded image instead of dummy
                    $scope.data.imageSrc = response.path;
                };
            }
        };
    });
