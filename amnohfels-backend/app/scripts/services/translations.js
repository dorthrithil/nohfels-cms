'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.translations
 * @description
 * # translations
 * Service in the amnohfelsBackendApp.
 */

// TODO (1.1.0) implement language switching

angular.module('amnohfelsBackendApp')
  .service('translations', function translations() {
    var language = 'GER';
    var languages = ['GER', 'ENG'];

    var errorMessages = {
      GER: {
        refreshJWTError: 'Deine Session ist abgelaufen: Bitte logge dich erneut ein.',
        badLoginCredentials: 'Diese Kombination aus Passwort und E-Mail Adresse existiert nicht!',
        invalidEmail: 'Die angegebene E-Mail Adresse ist nicht gültig.',
        invalidYoutubeUrl: 'Die angegebene Youtube-URL ist ungültig!',
        invalidUrl: 'Die angegebene URL ist ungültig!',
        emptyField: 'Bitte fülle alle Felder aus!',
        noImageUploaded: 'Bitte lade ein Bild hoch!',
        uploaderIsUploading: 'Bitte warte, bis der Upload vollständig ist!',
        noTagsProvided: 'Gib mindestens einen Tag an oder deaktiviere die Funktion!',
        emptyRequiredField: 'Bitte fülle alle Pflichtfelder aus!'
      }
    };

    this.setLanguage = function (lang) {
      language = (languages.indexOf(lang) !== -1) ? lang : 'GER';
    };

    this.getErrorMessages = function () {
      switch (language) {
        case 'GER':
          return errorMessages.GER;
      }
    };
  });
