(function() {

    var config_data =  {
        'GENERAL_CONFIG': {
            'LESSON_DIR': 'resources/lessons/'
        }
    };

    var config_module = angular.module('myApp.config', []);
    angular.forEach(config_data, function(key, value) {
        config_module.constant(value, key);
    });

})();
