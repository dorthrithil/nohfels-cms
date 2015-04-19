'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalImageForm
 * @description
 * # modalImageForm
 */
angular.module('amnohfelsBackendApp')
    .directive('modalImageForm', function (phpServerRoot, FileUploader) {
        return {
            templateUrl: 'views/modalimageform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'new') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.images = [];
                }
                $scope.modalVars.route = '/image';
                $scope.modalVars.data.page = $scope.topic;

                $scope.shiftLeft = function (index) {
                    var buffer = $scope.modalVars.data.images[index];
                    $scope.modalVars.data.images[index] = $scope.modalVars.data.images[index - 1];
                    $scope.modalVars.data.images[index - 1] = buffer;
                };

                $scope.shiftRight = function (index) {
                    var buffer = $scope.modalVars.data.images[index];
                    $scope.modalVars.data.images[index] = $scope.modalVars.data.images[index + 1];
                    $scope.modalVars.data.images[index + 1] = buffer;
                };

                $scope.toggleSize = function (index) {
                    switch ($scope.modalVars.data.images[index].imageSize) {
                        case 'small':
                            $scope.modalVars.data.images[index].imageSize = 'large';
                            break;
                        case 'large':
                            $scope.modalVars.data.images[index].imageSize = 'small';
                            break;
                        default:
                            break;
                    }
                };

                $scope.phpServerRoot = phpServerRoot; //for wiring up the thumbnail src in view

                //actions TODO finish and test with inet
                $scope.showConfirmDeletionFor = [];
                $scope.showConfirmDeletion = function (index) {
                    return $scope.showConfirmDeletionFor.indexOf(index) !== -1;
                };
                $scope.remove = function (index) {
                    switch ($scope.showConfirmDeletion(index)) {
                        case false:
                            $scope.showConfirmDeletionFor.push(index); //confirm deletion
                            break;
                        case true:
                            $scope.showConfirmDeletionFor.splice($scope.showConfirmDeletionFor.indexOf(index), 1);
                            $scope.modalVars.data.images.splice(index, 1); //delete
                    }
                };

                //file uploader
                var uploader = $scope.uploader = new FileUploader({
                    url: phpServerRoot + '/api/module/image/image/upload', //POST requests get send here
                    autoUpload: true
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
                        return item.size < 4050218; //TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)
                    }
                });

                //callbacks
                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) { //jshint ignore:line
                    //TODO error messages from filters go here
                };
                uploader.onCompleteItem = function (fileItem, response, status, headers) {//jshint ignore:line
                    $scope.modalVars.data.images.push({ //insert uploaded image
                        imageSize: 'small',
                        imageSrc: response.path,
                        imageThumbSrc: response.thumbPath,
                        imageThumbSquareSrc: response.thumbSquarePath
                    });
                };
            }
        };
    });
