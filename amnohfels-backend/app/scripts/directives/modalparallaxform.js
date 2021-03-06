'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalParallaxForm
 * @description
 * # modalParallaxForm
 */

//TODO (1.0.1) bug: "Bitte lade ein Bild hoch!" & "Bitte warte, bis der Upload vollständig ist!" at the same time
//TODO (1.0.1) resource management: when uploading a new image: delete old image from server
//TODO (1.0.1) UI: properly align error messages with preview image
//TODO (1.0.1) bug: firstUploadFinished logic doesn't make real sense. what about second uploads?

angular.module('amnohfelsBackendApp')
  .directive('modalParallaxForm', function (config, FileUploader, doorman, textAngularManager, util) {
    return {
      templateUrl: 'views/modalparallaxform.html',
      restrict: 'E',
      controller: function ($scope) {

        $scope.modifyHtml = util.taModifyHtml;

        //unregister textAngular editor
        $scope.dismissHook = function(){
          textAngularManager.unregisterEditor('caption');
        };

        // for form validation
        $scope.firstUploadFinished = false;

        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.heightNum = 500;
          $scope.modalVars.data.heightUnit = 'px';
          $scope.modalVars.data.bgImgSrc = '';
          $scope.modalVars.data.bgImgThumbSrc = '';
          $scope.modalVars.data.caption = '';
        }
        if ($scope.modalVars.action === 'update'){
          $scope.firstUploadFinished = true;
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
            content: '"px" gibt eine feste Größe von Pixeln auf dem Bildschirm an. "vh" ist eine Prozentangabe, wobei' +
              ' 100vh der Höhe des Bildschirms entspricht auf dem die Website gerade angesehen wird. Wenn der Inhalt' +
              ' bei der angegebenen Höhe nicht passt, wird die Höhe automatisch angepasst.'
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
          fn: function (item) {  //jshint ignore:line
            if (config.settings.maxImageFilesize === 0) {
              return true;
            } else {
              return item.size <= config.settings.maxImageFilesize;
            }
          }
        });

        //warn when image dimensions are under 1000px*560px
        function testImageDimensions(file) {
          var reader = new FileReader(); //create file reader

          function onLoadFile(event) { //function to be executed when file reader reads file
            var img = new Image(); //create image object
            img.onload = function() { //checks dimensions and warns user
              if (img.height < 560 || img.width < 1000) {
                $scope.$broadcast('show-image-dimension-warning'); //broadcast to ngfuerrorreporter
              }
            };
            img.src = event.target.result; //load image
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
          $scope.firstUploadFinished = true;
          $scope.modalVars.data.bgImgSrc = response.path;
          $scope.modalVars.data.bgImgThumbSrc = response.thumbPath;
        };

      }
    };
  });
