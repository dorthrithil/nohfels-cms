'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalParallaxForm
 * @description
 * # modalParallaxForm
 */

//TODO warning when image with width lower than 1000 and height lower than full hd converted height is being uploaded
//TODO when uploading e new image: delete old image from server

angular.module('amnohfelsBackendApp')
  .directive('modalParallaxForm', function (phpServerRoot, FileUploader) {
    return {
        templateUrl: 'views/modalparallaxform.html',
        restrict: 'E',
        controller: function ($scope) {
            if ($scope.modalVars.action === 'new') {
                $scope.modalVars.data.title = '';
                $scope.modalVars.data.heightNum = 500;
                $scope.modalVars.data.heightUnit = 'px';
                $scope.modalVars.data.bgImgSrc = '';
                $scope.modalVars.data.bgImgThumbSrc = '';
                $scope.modalVars.data.caption = '';
            }
            $scope.modalVars.route = '/parallax';
            $scope.modalVars.data.page = 'cafe'; //TODO get real page

            $scope.setHeightUnit = function(unit){
                $scope.modalVars.data.heightUnit = unit;
            };

            $scope.phpServerRoot = phpServerRoot; //for wiring up the thumbnail src in view

            //file uploader
            var uploader = $scope.uploader = new FileUploader({
                url: phpServerRoot + '/api/module/parallax/image/upload', //POST requests get send here
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
            uploader.onAfterAddingFile = function (fileItem) {//jshint ignore:line
                if (uploader.queue.length > 1) {
                    uploader.removeFromQueue(0); //only one file should be in the queue for the progress bar getting displayed properly
                }
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {//jshint ignore:line
                $scope.modalVars.data.bgImgSrc = response.path;
                $scope.modalVars.data.bgImgThumbSrc = response.thumbPath;
            };
        }
    };
  });
