(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('finishController', finishController);

    finishController.$inject = ['GENERAL_CONFIG', '$location', 'storageService'];

    function finishController(CONFIG, $location, storageService) {

        var vm = this;

        vm.start = startCourse;

        function startCourse() {
            storageService.resetFinishedLessons();
            storageService.setCurrentLesson(1);
            return $location.path(CONFIG.LESSON_URI + '1');
        }

    }

})();