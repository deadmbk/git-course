(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonController', lessonController);
    
    lessonController.$inject = [
        'GENERAL_CONFIG', '$scope', '$log', '$location',
        '$routeParams', 'lessonService', 'serverService', 'storageService'
    ];

    function lessonController(CONFIG, $scope, $log, $location, $routeParams, lessonService, serverService, storageService) {

        var vm = this;

        vm.lesson = {};                             // obiekt z lekcją
        vm.lessonNo = parseInt($routeParams.id);    // numer lekcji pobrany z adresu TODO: walidacja
        vm.currentStage = {};                       // obiekt zawierający aktywny etap lekcji
        vm.finished = false;                        // czy lekcja została zakończona? Powinno odblokować przycisk do przejścia dalej
        vm.isLast = false;                          // czy jest to ostatnia lekcja kursu

        vm.finish = finishCourse;
        vm.continue = continueCourse;

        var stageCounter = 0;                       // wskaźnik na aktywny etap (nie zależy od id stage'a)

        init();
        $scope.$on('terminal-input', onConsoleInput);

        ///////////////////////////////////////////////////////////////

        function init() {

            if (lessonService.ifExists(vm.lessonNo)) {

                // Pobierz dane lekcji
                lessonService.getLessons()
                    .then(onReceivedLesson, onError);

            } else {

                // Pobierz aktywny nr lekcji z localStorage
                var storageLesson = storageService.getCurrentLesson();

                // Jeśli dana nie istnieje, to przekieruj na pierwszą lekcję
                // Jeśli istnieje, przekieruj na lekcję o pobranej wartości
                if (storageLesson === null) {
                    return $location.path(CONFIG.LESSON_URI + '1');
                } else {
                    return $location.path(CONFIG.LESSON_URI + parseInt(storageLesson));
                }

            }

        }

        // -------------------------------------------------------------
        function onReceivedLesson(data) {

            // TODO: walidacja, co jak null?
            vm.lesson = data[vm.lessonNo - 1];
            vm.isLast = (data.length === vm.lessonNo);

            setCurrentStage();

            // Ustaw lekcję jako obecną
            storageService.setCurrentLesson(vm.lessonNo);
        }

        // -------------------------------------------------------------
        function onError(reason) {
            console.log(reason);
        }

        // -------------------------------------------------------------
        function onReceivedOutput(data) {
            
            // TODO: obsługa błędów z serwera
            sendToOutput(data.output);

            var command = data.command;

            if (isExpectedCommand(command)) {
                finishStage();
            }

        }

        // -------------------------------------------------------------
        function onConsoleInput(e, consoleInput) {
            
            var input = consoleInput[0];
            var cmd =  input.command;

            if (isValidCommand(cmd)) {
                serverService.executeCommand(cmd).then(onReceivedOutput);
            } else {
                sendToOutput(vm.currentStage["error"]); // TODO: dopracować
            }

        }

        // -------------------------------------------------------------
        function continueCourse() {
            return $location.path(CONFIG.LESSON_URI + (vm.lessonNo + 1));
        }

        // -------------------------------------------------------------
        function finishCourse() {
            storageService.removeCurrentLesson();
            return $location.path('/');
        }

        // -------------------------------------------------------------
        function executePrerequisiteScripts() {

            if (vm.currentStage.hasOwnProperty("prerequisites")) {

                if (vm.currentStage["prerequisites"].constructor === Array) {

                    // TODO: poprawić
                    var prerequisites = vm.currentStage["prerequisites"];
                    for (var i = 0; i < prerequisites.length; i++) {
                        serverService.executeScript(prerequisites[i])
                            .then(function(response) {
                                $log.info("Executed script '" + prerequisites[i] + "'.")
                            }, onError);
                    }

                } else {
                    $log.error('Property \'prerequisites\' of stage object is not valid. Excepted array.');
                }
            }
        }

        // -------------------------------------------------------------
        function setCurrentStage() {

            if (!(vm.lesson.hasOwnProperty("stages") && vm.lesson["stages"].constructor === Array)) {
                $log.error('Missing or invalid \'stages\' property of lesson object detected.');
            } else {

                for (var i = 0; i < vm.lesson["stages"].length; i++) {
                    if (i === stageCounter) {

                        $log.info("Starting stage nr " + stageCounter);
                        vm.currentStage = vm.lesson["stages"][i];

                        executePrerequisiteScripts();
                    }
                }
            }
        }

        // -------------------------------------------------------------
        function finishStage() {

            $log.info("Finishing stage nr " + stageCounter);
            if (stageCounter < vm.lesson["stages"].length - 1) {
                stageCounter++;
                setCurrentStage();
            } else {

                // TODO: finishLesson
                vm.finished = true;
                storageService.setCurrentLesson(vm.lessonNo + 1);
                alert('Lesson is finished.');
            }

        }

        // -------------------------------------------------------------
        function isExpectedCommand(command) {
            return (vm.currentStage["command"] === command);
        }

        // -------------------------------------------------------------
        function isValidCommand(command) {

            if (vm.currentStage.hasOwnProperty("availableCommands") && vm.currentStage["availableCommands"].constructor === Array) {

                var commands = vm.currentStage["availableCommands"];
                for (var aCommand in commands) {
                    if (commands[aCommand] === command) {
                        return true;
                    }
                }

                return false;
            }

            $log.error('Missing or invalid \'availableCommands\' property of stage object detected.');
            return false;
        }

        // -------------------------------------------------------------
        function sendToOutput(output) {

            $scope.$broadcast('terminal-output', {
                output: true,
                text: [output],
                breakLine: true
            });
        }
    }

})();