angular.module('myApp', ['ng-terminal-example', 'ngRoute'])
    .config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
        terminalConfigurationProvider.outputDelay = 0;
        terminalConfigurationProvider.allowTypingWriteDisplaying = false;
    }])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/components/home/home.html'
        }).when('/lesson/:id', {
            templateUrl: 'app/components/lesson/lesson.html',
            controller: 'lessonCtrl'
        }).otherwise({redirectTo: '/'});

}]).controller('mainCtrl', ['$scope', function($scope) {



}]);