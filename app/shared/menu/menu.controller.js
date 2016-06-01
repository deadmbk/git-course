(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('menuController', menuController);

    menuController.$inject = ['GENERAL_CONFIG', '$location', 'lessonService', 'storageService'];

    function menuController(CONFIG, $location, lessonService, storageService) {

        var vm = this;

        vm.lessons = {};
        vm.finishedLessons = [];

        vm.go = goToLesson;
        vm.isFinished = isLessonFinished;

        init();

        function init() {
            lessonService.getLessons().then(onReceivedLessons, onError);
            vm.finishedLessons = storageService.getFinishedLessons();
        }

        function isLessonFinished(lessonNo) {
            return true;
            // TODO: return vm.finishedLessons.contains(lessonNo);
        }

        function onReceivedLessons(data) {
            vm.lessons = data;
        }

        function onError(reason) {
            console.log(reason);
        }

        function goToLesson(nr) {
            return $location.path(CONFIG.LESSON_URI + nr);
        }

    }

})();
