var myApp = angular.module('myApp', ['ng-terminal-example']);

myApp.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
    terminalConfigurationProvider.outputDelay = 10;
    terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);

myApp.controller('mainCtrl', function($scope) {
    $scope.$on('terminal-input', function (e, consoleInput) {
        var cmd = consoleInput[0];
        console.log(cmd.command);
        // do stuff
    });
});