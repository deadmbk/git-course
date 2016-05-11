var myApp = angular.module('myApp', ['ng-terminal-example']);

myApp.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
    terminalConfigurationProvider.outputDelay = 0;
    terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);

myApp.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.$broadcast('terminal-output', {
            output: true,
            text: ['Welcome to vtortola.GitHub.io',
                'This is an example of ng-terminal-emulator.',
                '',
                "Please type 'help' to open a list of commands"],
            breakLine: true
        });

    $scope.$on('terminal-input', function (e, consoleInput) {

        var cmd = consoleInput[0];
       // console.log(cmd.command);

        $http.get('app/cli.php?cmd=' + cmd.command)
            .then(function(response) {

                $scope.$broadcast('terminal-output', {
                    output: true,
                    text: [response.data.output],
                    breakLine: true
                });

                console.log(response.data);
            });
        // do stuff


    });


}]);