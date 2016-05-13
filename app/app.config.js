(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['terminalConfigurationProvider'];

    function configure(terminalConfigurationProvider) {
        terminalConfigurationProvider.outputDelay = 0;
        terminalConfigurationProvider.allowTypingWriteDisplaying = false;
    }
    
})();
