'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:infotile
 * @description
 * # infotile
 */
angular.module('amnohfelsBackendApp')
  .directive('infotile', function (config, FileUploader, doorman) {
    return {
      templateUrl: 'views/infotile.html',
      restrict: 'E',
      scope: { //scope isolation to have different uploaders
        index: '=', //for disabling the up function of the first infotile
        isLastEmployee: '=', //for disabling the down function of the last infotile
        data: '=' //passing the modalVars.data in
      },
      controller: function ($scope) {
        //modalVars
        if ($scope.$parent.modalVars.action === 'update' && $scope.data.imageSrc) {
          $scope.imageSrc = config.server.root + $scope.data.imageSrc;
        }

        //actions
        $scope.showConfirmDeletion = false;
        $scope.remove = function () {
          switch ($scope.showConfirmDeletion) {
            case false:
              $scope.showConfirmDeletion = true; //confirm deletion
              break;
            case true:
              $scope.$parent.deleteInfotile($scope.index); //delegate to modal
          }
        };
        $scope.swapDown = function (index) {
          $scope.$parent.swapDownInfotile(index);
        };

        //file uploader
        var uploader = $scope.uploader = new FileUploader({
          url: config.server.api + 'module/infotile/tile/image', //POST requests get send here
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
          fn: function (item) { //jshint ignore:line
            if (config.settings.maxImageFilesize === 0) {
              return true;
            } else {
              return item.size <= config.settings.maxImageFilesize;
            }
          }
        });

        uploader.onAfterAddingFile = function () {
          if (uploader.queue.length > 1) {
            uploader.removeFromQueue(0); //only one file should be in the queue for the progress bar getting displayed properly
          }
        };
        uploader.onCompleteItem = function (fileItem, response) {
          $scope.imageSrc = config.server.root + response.path; //show uploaded image
          $scope.data.imageSrc = response.path;
        };

      }
    };
  });
