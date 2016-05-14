(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', homeController);

    homeController.$inject = ['GENERAL_CONFIG'];

    function homeController(CONFIG) {

        var vm = this;

        vm.url = '#' + CONFIG.LESSON_URI + '1';

    }

})();