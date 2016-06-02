(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('modalController', modalController);

    modalController.$inject = [
        '$scope', '$uibModalInstance', 'options'
    ];

    function modalController($scope, $uibModalInstance, options) {

        var DEFAULT_OKTEXT = "Tak";
        var DEFAULT_CANCELTEXT = "Anuluj";
        var DEFAULT_CANCELSHOW = true;

        $scope.title = options["title"];
        $scope.message = options["message"];
        $scope.okText = (options["okText"] !== undefined) ? options["okText"] : DEFAULT_OKTEXT;
        $scope.cancelText = (options["cancelText"] !== undefined) ? options["cancelText"] : DEFAULT_CANCELTEXT;
        $scope.cancelShow = (options["cancelShow"] !== undefined) ? options["cancelShow"] : DEFAULT_CANCELSHOW;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
