(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonController', lessonController);
    
    lessonController.$inject = ['$scope', '$log', '$routeParams', 'lessonService', 'serverService'];

    function lessonController($scope, $log, $routeParams, lessonService, serverService) {

        var vm = this;

        vm.lesson = {};                 // obiekt z lekcją
        vm.currentStage = {};           // obiekt zawierający aktywny etap lekcji
        vm.finished = false;            // czy lekcja została zakończona? Powinno odblokować przycisk do przejścia dalej
        vm.isLast = false;

        var stageCounter = 0;               // wskaźnik na aktywny etap (nie zależy od id stage'a)

        init();
        $scope.$on('terminal-input', onConsoleInput);

        ///////////////////////////////////////////////////////////////
        
        function init() {

            lessonService.getLesson($routeParams.id)
                .then(onReceivedLesson, onError);

            vm.isLast = lessonService.isLast($routeParams.id);

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