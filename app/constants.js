(function() {

    var config_data =  {
        'GENERAL_CONFIG': {
            'LESSON_DIR': 'resources/lessons/',
            'LESSON_URI': '/lesson/',
            'LESSON_STORE_PATH': 'lessons.json',
            'LESSON_STORAGE_KEY': 'lessonNo',
            'LESSON_STORAGE_FINISHED_KEY': 'finished',
            'SERVER_SCRIPTS_DIR': 'server/scripts/'
        }
    };

    var config_module = angular.module('myApp.constants', []);
    angular.forEach(config_data, function(key, value) {
        config_module.constant(value, key);
    });

})();
