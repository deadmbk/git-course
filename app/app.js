var myApp = angular.module('myApp', ['ng-terminal-example']);

myApp.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
    terminalConfigurationProvider.outputDelay = 10;
    terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);

myApp.controller('mainCtrl', function($scope) {

});