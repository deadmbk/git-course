(function() {
    'use strict';

    angular
        .module('myApp')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider', 'GENERAL_CONFIG'];

    function routeConfig($routeProvider, CONFIG) {

        $routeProvider.when('/home', {
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        }).when(CONFIG.LESSON_URI + ':id', {
            templateUrl: 'app/components/lesson/lesson.html',
            controller: 'lessonController',
            controllerAs: 'lessonCtrl'
        }).otherwise({redirectTo: '/home'});

    }

})();