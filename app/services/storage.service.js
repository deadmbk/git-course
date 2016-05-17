(function() {
    'use strict';

    angular
        .module("myApp")
        .factory("storageService", storageService);

    storageService.$inject = ['GENERAL_CONFIG', 'localStorageService'];

    function storageService(CONFIG, localStorageService) {

        var factory = {
            getCurrentLesson: getCurrentLesson,
            setCurrentLesson: setCurrentLesson
        };

        return factory;

        function getCurrentLesson() {
            return parseInt(localStorageService.get(CONFIG.LESSON_STORAGE_KEY));
        }

        function setCurrentLesson(lessonNo) {
            return localStorageService.set(CONFIG.LESSON_STORAGE_KEY, lessonNo);
        }

    }

})();

