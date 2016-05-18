(function() {
    'use strict';

    angular
        .module("myApp")
        .factory("storageService", storageService);

    storageService.$inject = ['GENERAL_CONFIG', 'localStorageService'];

    function storageService(CONFIG, localStorageService) {

        var factory = {
            getCurrentLesson: getCurrentLesson,
            setCurrentLesson: setCurrentLesson,
            removeCurrentLesson: removeCurrentLesson
        };

        return factory;

        function getCurrentLesson() {
            return parseInt(localStorageService.get(CONFIG.LESSON_STORAGE_KEY));
        }

        function setCurrentLesson(lessonNo) {
            return localStorageService.set(CONFIG.LESSON_STORAGE_KEY, lessonNo);
        }

        function removeCurrentLesson() {
            return localStorageService.remove(CONFIG.LESSON_STORAGE_KEY);
        }

    }

})();

