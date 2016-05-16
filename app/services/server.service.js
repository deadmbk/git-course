(function() {
    'use strict';
    
    angular
        .module("myApp")
        .factory("serverService", serverService);
    
    serverService.$inject = ['$http', 'GENERAL_CONFIG'];
    
    function serverService($http, CONFIG) {

        var factory = {
            executeCommand: executeCommand,
            executeScript: executeScript
        };
        
        return factory;
        
        //////////////////////////////////////////

        function executeCommand(command) {

            var params = { cmd: command };
            return executeScript('cli', params);
        }

        function executeScript(script, params) {

            var request = {
                method: 'GET',
                url: CONFIG.SERVER_SCRIPTS_DIR + script + '.php',
                params: params
            };

            // TODO: walidacja serverService.executeCommand
            return $http(request).then(function(response) {
                return response.data;
            });

        }
    }
})();
