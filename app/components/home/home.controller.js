(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', homeController);

    homeController.$inject = ['GENERAL_CONFIG', '$location', 'storageService'];

    function homeController(CONFIG, $location, storageService) {

        var vm = this;

        vm.lessonNo = storageService.getCurrentLesson();
        vm.continue = continueCourse;
        vm.start = startCourse;

        storageService.setCurrentLesson(2);

        ///////////////////////////////////////////////////

        function continueCourse() {

            if (vm.lessonNo !== null) {
                return $location.path(CONFIG.LESSON_URI + vm.lessonNo);
            }

            return false;
        }

        function startCourse() {
            storageService.setCurrentLesson(1);
            return $location.path(CONFIG.LESSON_URI + '1');
        }

    }

})();