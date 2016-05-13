(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('lessonService', lessonService);
    
    lessonService.$inject = ['$http', 'GENERAL_CONFIG'];
    
    function lessonService($http, CONFIG) {

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
    }

})();
