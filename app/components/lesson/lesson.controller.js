(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonController', lessonController);
    
    lessonController.$inject = ['GENERAL_CONFIG', '$scope', '$log', '$routeParams', 'lessonService', 'serverService'];

    function lessonController(CONFIG, $scope, $log, $routeParams, lessonService, serverService) {

        var vm = this;

        vm.button = {};                             // przycisk kontynuowana/zakończenia kursu
        vm.lesson = {};                             // obiekt z lekcją
        vm.lessonNo = parseInt($routeParams.id);    // numer lekcji pobrany z adresu TODO: walidacja
        vm.currentStage = {};                       // obiekt zawierający aktywny etap lekcji
        vm.finished = false;                        // czy lekcja została zakończona? Powinno odblokować przycisk do przejścia dalej
        vm.isLast = false;                          // czy jest to ostatnia lekcja kursu TODO: być może zbędne

        var stageCounter = 0;                       // wskaźnik na aktywny etap (nie zależy od id stage'a

        init();
        $scope.$on('terminal-input', onConsoleInput);

        ///////////////////////////////////////////////////////////////

        function init() {

            lessonService.getLesson(vm.lessonNo)
                .then(onReceivedLesson, onError);

            vm.isLast = lessonService.isLast(vm.lessonNo);
            vm.button = determineButtonDetails();

        }

        function onReceivedLesson(data) {
            vm.lesson = data;
            setCurrentStage();
        }

        function onError(reason) {
            console.log(reason);
        }

        function onReceivedOutput(data) {

            // TODO: obsługa błędów z serwera
            sendToOutput(data.output);

            var command = data.command;

            if (isExpectedCommand(command)) {
                finishStage();
            }

        }

        function onConsoleInput(e, consoleInput) {
            
            var input = consoleInput[0];
            var cmd =  input.command;

            // TODO: walidacja
            if (isValidCommand(cmd)) {
                serverService.executeCommand(cmd).then(onReceivedOutput);
            } else {
                sendToOutput(vm.currentStage["error"]); // TODO: walidacja
            }

        }

        function determineButtonDetails()  {

            var url = '';
            var text = '';

            if (vm.isLast) {
                url = '/';
                text = 'Finish';
            } else {
                url = '#' + CONFIG.LESSON_URI + (vm.lessonNo + 1);
                text = 'Continue';
            }

            var buttonObj = {
                url: url,
                text: text
            };

            return buttonObj;
        }

        function setCurrentStage() {

            if (!(vm.lesson.hasOwnProperty("stages") && vm.lesson["stages"].constructor === Array)) {
                $log.error('Missing or invalid \'stages\' property of lesson object detected.');
            } else {

                for (var i = 0; i < vm.lesson["stages"].length; i++) {
                    if (i === stageCounter) {
                        $log.info("Starting stage nr " + stageCounter);
                        vm.currentStage = vm.lesson["stages"][i];
                    }
                }
            }
        }

        function finishStage() {

            $log.info("Finishing stage nr " + stageCounter);
            if (stageCounter < vm.lesson["stages"].length - 1) {
                stageCounter++;
                setCurrentStage();
            } else {

                // finishLesson
                vm.finished = true;
                alert('Lesson is finished.');
            }

        }

        function isExpectedCommand(command) {
            return (vm.currentStage.command === command);
        }

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

        function sendToOutput(output) {

            $scope.$broadcast('terminal-output', {
                output: true,
                text: [output],
                breakLine: true
            });
        }
    }

})();