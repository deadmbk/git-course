(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('lessonService', lessonService);
    
    lessonService.$inject = ['$http', 'GENERAL_CONFIG'];
    
    function lessonService($http, CONFIG) {

        var factory = {
            getLessons: getLessons
        };

        return factory;

        /////////////////////////////////////
        function getLessons() {

            return $http.get(CONFIG.LESSON_DIR + CONFIG.LESSON_STORE_PATH)
                .then(function(response) {
                    return response.data;
                });
        }

        /*function getLesson(nr) {

            return $http.get(CONFIG.LESSON_DIR + CONFIG.LESSON_STORE_PATH)
                .then(function(response) {
                    return response.data[nr - 1];
                });

        }

        function getLesson2(nr) {

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

            this.getLessons().then(function(data) {
                return (data.length === nr);
            });

        }
        
        function ifExists(nr) {

            this.getLessons().then(function(data) {
                console.log(nr <= data.length);
                return (nr > 0 && nr <= data.length);
            });

        }*/
    }

})();
