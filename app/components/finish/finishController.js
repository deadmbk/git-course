(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('finishController', finishController);

    finishController.$inject = ['GENERAL_CONFIG', '$location', 'storageService', 'lessonService'];

    function finishController(CONFIG, $location, storageService, lessonService) {

        var vm = this;

        vm.lessonCount;
        vm.lessonDone;
        vm.start = startCourse;

        init();

        // -------------------------------------------------------------
        function init() {

            lessonService.getLessons()
                .then(onReceivedLessons, onError);

        }

        // -------------------------------------------------------------
        function onReceivedLessons(data) {
            vm.lessonCount = data.length;
            vm.lessonDone =  storageService.getFinishedLessons().length;
        }

        // -------------------------------------------------------------
        function onError(reason) {
            $log.error(reason);
        }

        // -------------------------------------------------------------
        function startCourse() {
            storageService.resetFinishedLessons();
            storageService.setCurrentLesson(1);
            return $location.path(CONFIG.LESSON_URI + '1');
        }



    }

})();