(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonCtrl', ['$scope', '$http', '$routeParams', 'GENERAL_CONFIG', 'lessonService', function($scope, $http, $routeParams, CONFIG, lessonService) {

            /*
             STALE:
             *katalog z gitem
             *katalog kursu (gdzie tworzony jest nowy projekt)

             * to dla php, na razie jest stała zdefiniowana w cli.php
             */

            $scope.lesson = {};                 // obiekt z lekcją
            $scope.currentStage = {};           // obiekt zawierający aktywny etap lekcji
            $scope.finished = false;            // czy lekcja została zakończona? Powinno odblokować przycisk do przejścia dalej
            $scope.isLast = false;

            var stageCounter = 0;               // wskaźnik na aktywny etap (nie zależy od id stage'a)


            init();
            $scope.$on('terminal-input', onInputCommand);

            ///////////////////////////////////////////////////////////////
            function init() {

                lessonService.getLesson($routeParams.id)
                    .then(onLessonSuccess, onError);

                $scope.isLast = lessonService.isLast($routeParams.id);


                function onLessonSuccess(response) {

                    $scope.lesson = response.data;
                    setCurrentStage();

                }

                function onError(reason) {
                    console.log(reason);
                };
            }





            var onCommandSuccess = function(response) {

                // TODO: obsługa błędów z serwera
                broadcast(response.data.output);

                //var command = response.data.command;
                var command = cmd;

                if (isExpectedCommand(command)) {
                    finishStage();
                }

            };

            function onInputCommand(e, consoleInput) {

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
                        .then(onCommandSuccess);

                } else {
                    broadcast($scope.currentStage["error"]); // TODO: walidacja
                }

            }

            var setCurrentStage = function() {

                if (!($scope.lesson.hasOwnProperty("stages") && $scope.lesson["stages"].constructor === Array)) {
                    console.log('Missing or invalid \'stages\' property of lesson object detected.');
                } else {

                    for (var i = 0; i < $scope.lesson["stages"].length; i++) {
                        if (i === stageCounter) {
                            console.log("Starting stage nr " + stageCounter);
                            $scope.currentStage = $scope.lesson["stages"][i];
                        }
                    }
                }
            };

            var finishStage = function() {

                console.log("Finishing stage nr " + stageCounter);
                if (stageCounter < $scope.lesson["stages"].length - 1) {
                    stageCounter++;
                    setCurrentStage();
                } else {

                    // finishLesson
                    $scope.finished = true;
                    alert('Lesson is finished.');
                }

            };

            var isExpectedCommand = function(command) {
                return ($scope.currentStage.command === command);
            };

            var isValidCommand = function(command) {

                if ($scope.currentStage.hasOwnProperty("availableCommands") && $scope.currentStage["availableCommands"].constructor === Array) {

                    var commands = $scope.currentStage["availableCommands"];
                    for (var aCommand in commands) {
                        if (commands[aCommand] === command) {
                            return true;
                        }
                    }

                    return false;
                }

                console.log('Missing or invalid \'availableCommands\' property of stage object detected.');
                return false;
            };

            var broadcast = function(output) {
                $scope.$broadcast('terminal-output', {
                    output: true,
                    text: [output],
                    breakLine: true
                });
            };

    }]);

})();