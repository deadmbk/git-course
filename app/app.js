(function() {
    'use strict';

    angular
        .module('myApp', ['ng-terminal-example', 'ngRoute', 'myApp.config'])
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

        }]).factory('lessonService', ['$http', 'GENERAL_CONFIG', function($http, CONFIG) {

            var lessonFilenames = ["lesson1.json"];

            var factory = {
                getLesson: getLesson,
                isLast: isLast
            };

            return factory;

            /////////////////////////////////////

            function getLesson(nr) {

                if (nr > lessonFilenames.length) {
                    return null;
                } else {

                    var filename = lessonFilenames[nr - 1];
                    return $http.get(CONFIG.LESSON_DIR + filename, function(response) {
                        return response.data;
                    });
                }

                return null;
            }

            function isLast(nr) {
                return (lessonFilenames === nr);
            }

        //var deferred = $q.defer();
        //$http.get(CONFIG.LESSON_INCL_FILE).then(function(response) {
        //    deferred.resolve(response);
        //});
        //
        //this.getLessons = function() {
        //    return deferred.promise;
        //}

    }]).controller('mainCtrl', ['$scope', function($scope) {



    }]);
})();