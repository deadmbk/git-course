(function() {
    'use strict';

    angular
        .module('myApp')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/components/home/home.html'
        }).when('/lesson/:id', {
            templateUrl: 'app/components/lesson/lesson.html',
            controller: 'lessonController',
            controllerAs: 'lessonCtrl'
        }).otherwise({redirectTo: '/'});

    }

})();