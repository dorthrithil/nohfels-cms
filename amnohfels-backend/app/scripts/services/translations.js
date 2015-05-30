'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.translations
 * @description
 * # translations
 * Service in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
    .service('translations', function translations() {
        var language = 'GER';
        var languages = ['GER', 'ENG'];

        var errorMessages = {
            GER: {
                refreshJWTError: 'Deine Session ist abgelaufen: Bitte logge dich erneut ein.',
                badLoginCredentials: 'Diese Kombination aus Passwort und E-Mail Adresse existiert nicht!',
                invalidEmail: 'Die angegebene E-Mail Adresse ist nicht gültig.',
                emptyField: 'Bitte fülle alle Felder aus!'
            }
        };

        this.setLanguage = function (lang) {
            language = (languages.indexOf(lang) !== -1) ? lang : 'GER';
        };

        this.getErrorMessages = function(){
            switch(language){
                case 'GER':
                    return errorMessages.GER;
            }
        };
    });
