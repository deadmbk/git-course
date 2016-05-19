(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('lessonService', lessonService);
    
    lessonService.$inject = ['$http', 'GENERAL_CONFIG'];
    
    function lessonService($http, CONFIG) {

        var lessonFilenames = ["lesson1.json", "lesson2.json"];

        var factory = {
            getLesson: getLesson,
            getLessons: getLessons,
            isLast: isLast,
            ifExists: ifExists
        };

        return factory;

        /////////////////////////////////////
        function getLessons() {

            var filename = "lessons.json";

            return $http.get(CONFIG.LESSON_DIR + filename)
                .then(function(response) {
                    return response.data;
                });
        }

        function getLesson2(nr) {

            var filename = "lessons.json";

            return $http.get(CONFIG.LESSON_DIR + filename)
                .then(function(response) {
                    return response.data[nr - 1];
                });

        }

        function getLesson(nr) {

            if (nr > lessonFilenames.length) {
                return null;
            } else {

                var filename = lessonFilenames[nr - 1];
                // TODO: walidacja lessonService.getLesson
                return $http.get(CONFIG.LESSON_DIR + filename)
                    .then(function(response) {
                        return response.data;
                    });
            }

            return null;
        }

        function isLast(nr) {
            return (lessonFilenames.length === nr);
        }
        
        function ifExists(nr) {
            return (nr > 0 && nr <= lessonFilenames.length);
        }
    }

})();
