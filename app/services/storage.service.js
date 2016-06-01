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
            removeCurrentLesson: removeCurrentLesson,

            setLessonAsFinished: setLessonAsFinished,
            getFinishedLessons: getFinishedLessons,
            resetFinishedLessons: resetFinishedLessons
        };

        return factory;

        function getCurrentLesson() {
            return parseInt(localStorageService.get(CONFIG.LESSON_STORAGE_KEY));
        }

        function setCurrentLesson(lessonNo) {
            return localStorageService.set(CONFIG.LESSON_STORAGE_KEY, lessonNo);
        }

        function getFinishedLessons() {
            var key = localStorageService.get(CONFIG.LESSON_STORAGE_FINISHED_KEY);
            var arr = Array();

            if (key !== null) {
                arr = angular.fromJson(key);
            }

            return arr;
        }

        function setLessonAsFinished(lessonNo) {

            var key = localStorageService.get(CONFIG.LESSON_STORAGE_FINISHED_KEY);
            var arr = Array();

            if (key !== null) {
                arr = angular.fromJson(key);
            }

            console.log(arr);

            if (arr.indexOf(lessonNo) === -1) {
                arr.push(lessonNo);
                key = angular.toJson(arr);
                localStorageService.set(CONFIG.LESSON_STORAGE_FINISHED_KEY, key);
            }

        }

        function resetFinishedLessons() {
            return localStorageService.remove(CONFIG.LESSON_STORAGE_FINISHED_KEY);
        }

        function removeCurrentLesson() {
            return localStorageService.remove(CONFIG.LESSON_STORAGE_KEY);
        }

    }

})();

