(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonModalController', lessonModalController);

    lessonModalController.$inject = [
        '$scope', '$uibModalInstance', 'message'
    ];

    function lessonModalController($scope, $uibModalInstance, message) {

        $scope.message = message;
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
