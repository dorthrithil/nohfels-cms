'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:employee
 * @description
 * # employee
 */

//TODO set right breakpoints on small devices for view

angular.module('amnohfelsBackendApp')
    .directive('employee', function (phpServerRoot, FileUploader, doorman) {
        return {
            templateUrl: 'views/employee.html',
            restrict: 'E',
            scope: { //scope isolation to have different uploaders
                index: '=', //for displaying the different buddy icons & disabling the up function of the first employee
                isLastEmployee: '=', //for disabling the down function of the last employee
                data: '=' //passing the modalVars.data in
            },
            controller: function ($scope) {
                //modalVars
                if ($scope.$parent.modalVars.action === 'edit') { //TODO edit should be named update
                    $scope.imageSrc = phpServerRoot + '/' + $scope.data.imageSrc;
                }
                //show dummy if the module is new (action === 'new') or if we added a new employee to an existing one (imageSrc === '')
                if ($scope.$parent.modalVars.action === 'new' || $scope.data.imageSrc === '') { //TODO new should be named create
                    $scope.imageSrc = '/images/user_icon_dummies/' + $scope.index % 3 + '.png';
                }

                //actions
                $scope.showConfirmDeletion = false;
                $scope.remove = function () {
                    switch ($scope.showConfirmDeletion) {
                        case false:
                            $scope.showConfirmDeletion = true; //confirm deletion
                            break;
                        case true:
                            $scope.$parent.deleteEmployee($scope.index); //delegate to modal
                    }
                };
                $scope.swapDown = function (index) {
                    $scope.$parent.swapDownEmployee(index);
                };

                //file uploader
                var uploader = $scope.uploader = new FileUploader({
                    url: phpServerRoot + '/api/module/staff/employee/image', //POST requests get send here
                    autoUpload: true,
                    headers :{
                        'JWT': doorman.getJWT()
                    }
                });

                //filters
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
                    fn: function (item) {
                        return item.size < 4050218; //TODO "(32) broken pipe" when file is larger than 4.048.218 bytes (max value that worked in the tests)
                    }
                });

                //callbacks
                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) { //jshint ignore:line
                    //TODO error messages from filters go here
                };
                uploader.onAfterAddingFile = function (fileItem) {//jshint ignore:line
                    if (uploader.queue.length > 1) {
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
