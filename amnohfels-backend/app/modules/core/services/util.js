'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.util
 * @description
 * # util
 * Service in the amnohfelsBackendApp.
 */
angular.module('coreModule')
  .service('util', function util() {
    this.taModifyHtml = function($html){
      var DOMTree = jQuery(jQuery.parseHTML($html, null, false));
      jQuery.each(DOMTree, function(key, value){
        jQuery(value).removeAttr('style').find('*').removeAttr('style').removeClass();
      });
      return jQuery('<div>').append(DOMTree).html();
    };
  });
