(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('modalService', modalService);

    modalService.$inject = ['GENERAL_CONFIG', '$uibModal'];

    function modalService(CONFIG, $uibModal) {

        var factory = {
            createModal: createModal
        };

        return factory;

        /////////////////////////////////////
        function createModal(title, message, okText, cancelText, cancelShow) {

            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'app/shared/modal/modal.html',
                controller: 'modalController',
                size: 'sm',
                resolve: {
                    options: function () {

                        return {
                            message: message,
                            title: title,
                            okText: okText,
                            cancelText: cancelText,
                            cancelShow: cancelShow
                        };

                    }
                }
            });

            return modalInstance;
        }

    }

})();