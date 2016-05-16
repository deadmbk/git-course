(function() {

    var config_data =  {
        'GENERAL_CONFIG': {
            'LESSON_DIR': 'resources/lessons/',
            'SERVER_SCRIPTS_DIR': 'server/scripts/',
            'LESSON_URI': '/lesson/'
        }
    };

    var config_module = angular.module('myApp.constants', []);
    angular.forEach(config_data, function(key, value) {
        config_module.constant(value, key);
    });

})();
