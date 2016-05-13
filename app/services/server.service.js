(function() {
    'use strict';
    
    angular
        .module("myApp")
        .factory("serverService", serverService);
    
    serverService.$inject = ['$http', 'GENERAL_CONFIG'];
    
    function serverService($http, CONFIG) {

        var factory = {
            executeCommand: executeCommand
        };
        
        return factory;
        
        //////////////////////////////////////////
        
        function executeCommand(command) {

            var request = {
                method: 'GET',
                url: CONFIG.SERVER_CLI_FILE,
                params: { cmd: command }
            };

            // TODO: walidacja serverService.executeCommand
            return $http(request).then(function(response) {
                return response.data;
            });
        }
        
    }
})();
