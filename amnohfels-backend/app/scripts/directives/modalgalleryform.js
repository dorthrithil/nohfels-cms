'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalGalleryForm
 * @description
 * # modalGalleryForm
 */

//TODO (1.0.1) bug (firefox, most probably also ie): after picture upload is finished the "server is processing" indication isn't shown
//TODO (1.0.1) improvement: mechanism for automatically handling the bigger-option on pictures so no layout errors will occur
//TODO (1.0.1) bug: firstUploadFinished logic doesn't make real sense. what about second uploads?
//TODO (1.0.1) UI: optimise thumbnail caption toolbar
//TODO (1.0.1) bug: don't add broken gallery image when upload on server fails

angular.module('amnohfelsBackendApp')
  .directive('modalGalleryForm', function (config, FileUploader, doorman) {
    return {
      templateUrl: 'views/modalgalleryform.html',
      restrict: 'E',
      controller: function ($scope) {
        // for form validation
        $scope.firstUploadFinished = false;

        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.images = [];
        }
        if ($scope.modalVars.action === 'update') {
          $scope.firstUploadFinished = true;
          for (var i = 0; i < $scope.modalVars.data.images.length; i++) {
            $scope.modalVars.data.images[i].hasImageCaption = $scope.modalVars.data.images[i].imageCaption !== '';
          }
        }
        $scope.modalVars.route = '/gallery';
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

        /**
         * Toggles image caption for an image. If toggled off, the caption will first not be deleted, only hidden. On
         * the server it will be decided to save or discard the caption via the hasImageCaption boolean
         * @param index - The index of the selected image
         */
        $scope.toggleCaption = function (index) {
          $scope.modalVars.data.images[index].hasImageCaption = !$scope.modalVars.data.images[index].hasImageCaption;
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
            content: 'Wenn du die "Groß"-Option bei einem Bild aktivierst, wird das Bild auf der Website in voller' +
            ' Breite angezeigt. Sei dir bewusst, dass du zur Zeit darauf achten musst, dass nach einem großen Bild' +
            ' mindestens eine Reihe von drei kleinen Bildern folgen muss, damit die Bilder schön angeordnet werden' +
            ' können. (In zukünftigen Versionen wird das behoben)'
          }
        };

        //file uploader
        var uploader = $scope.uploader = new FileUploader({
          url: config.server.api + 'module/gallery/image/upload', //POST requests get send here
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

        //when file uploading succeeds..
        uploader.onCompleteItem = function (fileItem, response) {
          $scope.firstUploadFinished = true;
          $scope.modalVars.data.images.push({ //insert uploaded image
            imageSize: 'small',
            imageSrc: response.path,
            imageThumbSrc: response.thumbPath,
            imageThumbSquareSrc: response.thumbSquarePath,
            imageCaption: '',
            hasImageCaption: false
          });
        };
      }
    };
  });
