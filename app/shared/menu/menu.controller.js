(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('menuController', menuController);

    menuController.$inject = ['GENERAL_CONFIG', '$location', 'lessonService', 'storageService'];

    function menuController(CONFIG, $location, lessonService, storageService) {

        var vm = this;

        vm.lessons = {};
        vm.go = goToLesson;

        init();

        function init() {
            lessonService.getLessons().then(onReceivedLessons, onError);
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
