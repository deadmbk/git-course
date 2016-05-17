(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure)
        .config(configureStorage);

    configure.$inject = ['terminalConfigurationProvider', 'localStorageServiceProvider'];

    function configure(terminalConfigurationProvider) {
        terminalConfigurationProvider.outputDelay = 0;
        terminalConfigurationProvider.allowTypingWriteDisplaying = false;
    }

    function configureStorage(localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageType('sessionStorage')
            .setPrefix('gc') // git-course
            .setStorageCookie(30, '/');
    }
    
})();
