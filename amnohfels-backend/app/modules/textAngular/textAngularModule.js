'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsBackendApp
 * @description
 * # amnohfelsBackendApp
 *
 * A small module to encapsulate my custom testAngular setup
 */

angular
    .module('textAngularModule', ['ngRoute', 'textAngular', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])

    //configuration
    .config(function ($routeProvider, $provide) {
        //configure textAngular
        $provide.decorator('taOptions', ['$compile', '$timeout', '$window', 'taRegisterTool', 'taTranslations', '$delegate', function ($compile, $timeout, $window, taRegisterTool, taTranslations, taOptions) {
            //file upload tool
            taRegisterTool('fileupload', {
                tooltiptext: 'Upload a file to link to',
                iconclass: 'fa fa-upload',
                action: function () {
                    var button = jQuery('[name="fileupload"]'); //get button
                    var popoverContent = angular.element('<ta-fileupload-popover></ta-fileupload-popover>'); //create popover
                    var $buttonScope = button.scope();
                    $compile(popoverContent)($buttonScope); //compile it to the buttons scope
                    button.popover({
                        content: popoverContent, //TODO optimise popover placement & wrap words in selected file
                        placement: 'bottom',
                        container: 'body',
                        viewport: button,
                        html: true
                    });
                    button.popover('show');
                    var self = this; //for reference inside next function
                    $buttonScope.performAction = function () { //taFileuploadPopover calls this after finishing the upload
                        var urlLink = $buttonScope.taFileUploadAccessPath; //relative path - will be made absolute on client, this way links will still work when we change the environment
                        if (urlLink && urlLink !== '' && urlLink !== 'http://') { //wrap selection like in insertLink tool
                            button.popover('destroy'); //destroy popover
                            return self.$editor().wrapSelection('createLink', urlLink, true);
                        }
                    };
                },
                activeState: function (commonElement) {
                    if (commonElement) {
                        return commonElement[0].tagName === 'A' && commonElement[0].href.indexOf('uploads/files/') !== -1;
                    }
                    return false;
                }
            });
            taRegisterTool('insertLink2', {
                tooltiptext: taTranslations.insertLink.tooltip,
                iconclass: 'fa fa-link',
                action: function(){
                    var urlLink;
                    urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, 'http://');
                    if(urlLink && urlLink !== '' && urlLink !== 'http://'){
                        return this.$editor().wrapSelection('createLink', urlLink, true);
                    }
                },
                activeState: function(commonElement){
                    if(commonElement) {
                        return commonElement[0].tagName === 'A' && commonElement[0].href.indexOf('uploads/files/') === -1;
                    }
                    return false;
                },
                onElementSelect: {
                    element: 'a',
                    action: function(event, $element, editorScope){
                        // setup the editor toolbar
                        // Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic
                        event.preventDefault();
                        editorScope.displayElements.popover.css('width', '436px');
                        var container = editorScope.displayElements.popoverContainer;
                        container.empty();
                        container.css('line-height', '28px');
                        var link = angular.element('<a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('href') + '</a>');
                        link.css({
                            'display': 'inline-block',
                            'max-width': '200px',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis',
                            'white-space': 'nowrap',
                            'vertical-align': 'middle'
                        });
                        container.append(link);
                        var buttonGroup = angular.element('<div class="btn-group pull-right">');
                        var reLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></button>');
                        reLinkButton.on('click', function(event){
                            event.preventDefault();
                            var urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, $element.attr('href'));
                            if(urlLink && urlLink !== '' && urlLink !== 'http://'){
                                $element.attr('href', urlLink);
                                editorScope.updateTaBindtaTextElement();
                            }
                            editorScope.hidePopover();
                        });
                        buttonGroup.append(reLinkButton);
                        var unLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></button>');
                        // directly before this click event is fired a digest is fired off whereby the reference to $element is orphaned off
                        unLinkButton.on('click', function(event){
                            event.preventDefault();
                            $element.replaceWith($element.contents());
                            editorScope.updateTaBindtaTextElement();
                            editorScope.hidePopover();
                        });
                        buttonGroup.append(unLinkButton);
                        var targetToggle = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">' + taTranslations.editLink.targetToggle.buttontext + '</button>');
                        if($element.attr('target') === '_blank'){
                            targetToggle.addClass('active');
                        }
                        targetToggle.on('click', function(event){
                            event.preventDefault();
                            $element.attr('target', ($element.attr('target') === '_blank') ? '' : '_blank');
                            targetToggle.toggleClass('active');
                            editorScope.updateTaBindtaTextElement();
                        });
                        buttonGroup.append(targetToggle);
                        container.append(buttonGroup);
                        editorScope.showPopover($element);
                    }
                }
            });
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['insertLink2', 'fileupload']
            ];
            return taOptions;
        }]);
    });