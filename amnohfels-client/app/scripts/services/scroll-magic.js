'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.scrollMagic
 * @description
 * # scrollMagic
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('scrollMagic', function scrollMagic() {
     var instance = new ScrollMagic({globalSceneOptions: {triggerHook: 'onEnter', duration: $(window).height()*2}});
     this.get = function(){
         return instance;
     };
  });
