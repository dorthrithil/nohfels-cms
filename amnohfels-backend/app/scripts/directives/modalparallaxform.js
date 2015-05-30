'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalParallaxForm
 * @description
 * # modalParallaxForm
 */

//TODO (1.0.1) resource management: when uploading a new image: delete old image from server
//TODO (1.0.1) UI: properly align error messages with preview image

angular.module('amnohfelsBackendApp')
    .directive('modalParallaxForm', function (config, FileUploader, doorman) {
        return {
            templateUrl: 'views/modalparallaxform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'create') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.heightNum = 500;
                    $scope.modalVars.data.heightUnit = 'px';
                    $scope.modalVars.data.bgImgSrc = '';
                    $scope.modalVars.data.bgImgThumbSrc = '';
                    $scope.modalVars.data.caption = '';
                }
                $scope.modalVars.route = '/parallax';
                $scope.modalVars.data.pageTopic = $scope.pageTopic;

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

                //warn when image dimensions are under 1000px*560px
                function testImageDimensions(file){
                    var reader = new FileReader(); //create file reader
                    function onLoadFile(event) { //function to be executed when file reader reads file
                        var img = new Image(); //create image object
                        img.onload = onLoadImage(img); //link dimension test function
                        img.src = event.target.result; //load image
                    }
                    function onLoadImage(img) { //checks dimensions and warns user
                        if(img.height < 560 || img.width < 1000){
                            $scope.$broadcast('show-image-dimension-warning'); //broadcast to ngfuerrorreporter
                        }
                    }
                    reader.onload = onLoadFile;
                    reader.readAsDataURL(file); //read file
                }

                uploader.onAfterAddingFile = function (fileItem) {
                    testImageDimensions(fileItem._file);
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
