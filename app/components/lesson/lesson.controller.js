(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonController', lessonController);
    
    lessonController.$inject = ['$scope', '$http', '$routeParams', 'lessonService'];

    function lessonController($scope, $http, $routeParams, lessonService) {

        /*
         STALE:
         *katalog z gitem
         *katalog kursu (gdzie tworzony jest nowy projekt)

         * to dla php, na razie jest stała zdefiniowana w cli.php
         */

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

        function onReceivedLesson(response) {

            vm.lesson = response.data;
            setCurrentStage();

        }

        function onError(reason) {
            console.log(reason);
        }

        function onReceivedOutput(response) {

            // TODO: obsługa błędów z serwera
            sendToOutput(response.data.output);

            var command = response.data.command;

            if (isExpectedCommand(command)) {
                finishStage();
            }

        }

        function onConsoleInput(e, consoleInput) {

            /*

             - Musi istnieć licznik dla stage'y
             - lekcje w osobnych plikach - przy routerze będzie pobierany odpowiedni plik z jsonem, ładowany do obiektu js
             - w oparciu o licznik potrzebna jet funkcja, która wydobędzie informacje o wybranym stage'u.

             */

            /*
             1. Sprawdź czy polecenie jest poleceniem kończącym
             2. Jeśli jest, wczytaj następnego stage'a
             3. Jeśli nie, sprawdź czy komenda jest dozwolona - jest ok
             4. Jeśli nie jest wyświetl komunikat z pola "error"

             */


            var input = consoleInput[0];
            var cmd =  input.command;

            if (isValidCommand(cmd)) {

                $http.get('app/cli.php?cmd=' + cmd)
                    .then(onReceivedOutput);

            } else {
                sendToOutput(vm.currentStage["error"]); // TODO: walidacja
            }

        }

        function setCurrentStage() {

            if (!(vm.lesson.hasOwnProperty("stages") && vm.lesson["stages"].constructor === Array)) {
                console.log('Missing or invalid \'stages\' property of lesson object detected.');
            } else {

                for (var i = 0; i < vm.lesson["stages"].length; i++) {
                    if (i === stageCounter) {
                        console.log("Starting stage nr " + stageCounter);
                        vm.currentStage = vm.lesson["stages"][i];
                    }
                }
            }
        }

        function finishStage() {

            console.log("Finishing stage nr " + stageCounter);
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

            console.log('Missing or invalid \'availableCommands\' property of stage object detected.');
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