'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalImageForm
 * @description
 * # modalImageForm
 */

//TODO add caption functionality to gallery

//TODO (1.0.1) bug (firefox, most probably also ie): after picture upload is finished the "server is processing" indication isn't shown
//TODO (1.0.1) improvement: mechanism for automatically handling the bigger-option on pictures so no layout errors will occur

angular.module('amnohfelsBackendApp')
    .directive('modalImageForm', function (config, FileUploader, doorman) {
        return {
            templateUrl: 'views/modalimageform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'create') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.images = [];
                }
                $scope.modalVars.route = '/image';
                $scope.modalVars.data.pageTopic = $scope.pageTopic;

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

                $scope.serverRoot = config.server.root; //for wiring up the thumbnail src in view

                //actions
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

                //data for popovers
                $scope.popovers = {
                    images: {
                        title: 'Erklärung zur "Groß"-Option',
                        content: 'Wenn du die "Groß"-Option bei einem Bild aktivierst, wird das Bild auf der Website in voller Breite angezeigt. Sei dir bewusst, dass du zur Zeit darauf achten musst, dass nach einem großen Bild mindestens eine Reihe von drei kleinen Bildern folgen muss, damit die Bilder schön angeordnet werden können. (In zukünftigen Versionen wird das behoben)'
                    }
                };

                //file uploader
                var uploader = $scope.uploader = new FileUploader({
                    url: config.server.api + 'module/image/image/upload', //POST requests get send here
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

                //when file uploading succeeds..
                uploader.onCompleteItem = function (fileItem, response) {
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
