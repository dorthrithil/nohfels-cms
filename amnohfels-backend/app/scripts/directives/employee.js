'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:employee
 * @description
 * # employee
 */

//TODO (1.0.1) UI: set right breakpoints on small devices for view
//TODO (10.01) bug: unnecessary 404 errors after file upload failed (because of empty path - check status first)

angular.module('amnohfelsBackendApp')
  .directive('employee', function (config, FileUploader, doorman) {
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
        if ($scope.$parent.modalVars.action === 'update') {
          $scope.imageSrc = config.server.root + $scope.data.imageSrc;
        }
        // show dummy if the module is new (action === 'new') or if we added a new employee to
        // an existing one (imageSrc === '')
        if ($scope.$parent.modalVars.action === 'create' || $scope.data.imageSrc === '') {
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
          url: config.server.api + 'module/staff/employee/image', //POST requests get send here
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
            return true;//item.size < 4050218; //TODO (1.0.1) this has to go in a config file and hs to be set on server too
          }
        });

        uploader.onAfterAddingFile = function () {
          if (uploader.queue.length > 1) {
            uploader.removeFromQueue(0); //only one file should be in the queue for the progress bar getting displayed properly
          }
        };
        uploader.onCompleteItem = function (fileItem, response) {
          $scope.imageSrc = config.server.root + response.path; //show uploaded image instead of dummy
          $scope.data.imageSrc = response.path;
        };
      }
    };
  });
