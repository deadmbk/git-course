(function() {
    'use strict';

    angular
        .module('myApp')
        .directive('menu', menuDirective);

    function menuDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/menu/menu.html',
            controller: 'menuController',
            controllerAs: 'menu'
        }
    }

})();
