'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:taFileuploadPopover
 * @description
 * # taFileuploadPopover
 */
angular.module('textAngularModule')
    .directive('taFileuploadPopover', function (config, FileUploader, doorman) {
        return {
            templateUrl: 'modules/textAngular/views/tafileuploadpopover.html',
            restrict: 'E',
            scope: {},
            controller: function ($scope, $element) {
                $scope.dismiss = function () {
                    $element.parent().parent().popover('destroy');
                    $scope.$destroy();
                };

                //file uploader
                var uploader = $scope.uploader = new FileUploader({
                    url: config.server.api + 'util/fileupload', //POST requests get send here
                    autoUpload: true,
                    headers: {
                        'JWT': doorman.getJWT()
                    }
                });

                //filters
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
                    //get buttonScope. because popovers are attached to the body, we can't simply navigate from $element
                    //the button scope is the scope of textAngulars fileupload button
                    var $buttonScope = jQuery('[name="fileupload"]').scope();
                    $buttonScope.taFileUploadAccessPath = response.path;
                    $buttonScope.performAction();
                    $buttonScope.taFileUploadAccessPath = null;
                    $scope.$destroy();
                };
            }
        };
    });
