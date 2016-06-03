(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configureTerminal)
        .config(configureStorage);

    configureTerminal.$inject = ['terminalConfigurationProvider'];
    configureStorage.$inject = ['localStorageServiceProvider'];

    function configureTerminal(terminalConfigurationProvider) {
        terminalConfigurationProvider.outputDelay = 0;
        terminalConfigurationProvider.allowTypingWriteDisplaying = false;
    }

    function configureStorage(localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageType('localStorage')
            .setPrefix('gc') // git-course
            .setStorageCookie(30, '/');
    }
    
})();
