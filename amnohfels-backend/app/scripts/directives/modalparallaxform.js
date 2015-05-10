'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalParallaxForm
 * @description
 * # modalParallaxForm
 */

//TODO warning when image with width lower than 1000 and height lower than full hd converted height is being uploaded
//TODO when uploading a new image: delete old image from server

angular.module('amnohfelsBackendApp')
    .directive('modalParallaxForm', function (config, FileUploader, doorman) {
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
                $scope.modalVars.data.page = $scope.topic;

                $scope.setHeightUnit = function (unit) {
                    $scope.modalVars.data.heightUnit = unit;
                };

                $scope.serverRoot = config.server.root; //for wiring up the thumbnail src in view

                //data for popovers
                $scope.popovers = {
                    units: {
                        title: 'Erklärung zu den Einheiten',
                        content: '"px" gibt eine feste Größe von Pixeln auf dem Bildschirm an. "vh" ist eine Prozentangabe, wobei 100vh der Höhe des Bildschirms entspricht auf dem die Website gerade angesehen wird.'
                    }
                };

                //file uploader
                var uploader = $scope.uploader = new FileUploader({
                    url: config.server.api + 'module/parallax/image/upload', //POST requests get send here
                    autoUpload: true,
                    headers: {
                        'JWT': doorman.getJWT()
                    }
                });

                //filters
                //only image files
                uploader.filters.push({
                    name: 'imageFilter',
                    fn: function (item) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });
                //restrict size
                uploader.filters.push({
                    name: 'sizeFilter',
                    fn: function (item) {
                        return item.size < 4050218; //TODO "(32) broken pipe" when file is larger than 4.048.218 bytes (max value that worked in the tests)
                    }
                });

                uploader.onAfterAddingFile = function () {
                    if (uploader.queue.length > 1) {
                        uploader.removeFromQueue(0); //only one file should be in the queue for the progress bar getting displayed properly
                    }
                };
                uploader.onCompleteItem = function (fileItem, response) {
                    $scope.modalVars.data.bgImgSrc = response.path;
                    $scope.modalVars.data.bgImgThumbSrc = response.thumbPath;
                };
            }
        };
    });
