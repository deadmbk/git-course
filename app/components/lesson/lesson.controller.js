(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('lessonController', lessonController);
    
    lessonController.$inject = [
        'GENERAL_CONFIG', '$scope', '$log', '$location',
        '$routeParams', 'lessonService', 'serverService', 'storageService', 'modalService'
    ];

    function lessonController(CONFIG, $scope, $log, $location, $routeParams, lessonService, serverService, storageService, modalService) {

        var vm = this;

        // TODO: courseController powinien zajmować się logiką związaną z całym kursem (zmienne lessonCount i courseFinished), a nie lessonController

        vm.courseFinished = false;
        vm.currentStage = {};                       // obiekt zawierający aktywny etap lekcji
        vm.finished = false;                        // czy lekcja została zakończona? Powinno odblokować przycisk do przejścia dalej
        vm.isLast = false;                          // czy jest to ostatnia lekcja kursu
        vm.lesson = {};                             // obiekt z lekcją
        vm.lessonNo = parseInt($routeParams.id);    // numer lekcji pobrany z adresu TODO: walidacja
        vm.lessonCount;

        vm.finish = finishCourse;
        vm.reset = resetCourse;

        vm.next = goNext;
        vm.previous = goPrevious;

        var stageCounter = 0;                       // wskaźnik na aktywny etap (nie zależy od id stage'a)

        init();
        $scope.$on('terminal-input', onConsoleInput);

        ///////////////////////////////////////////////////////////////

        function init() {

            lessonService.getLessons()
                .then(onReceivedLessons, onError);

        }

        function redirect() {

            // TODO: przypadek gdy storage trzyma nieistniejący numer lekcji i przejdziemy pod adres innej (lub tej samej) nieistniejącej lekcji

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

        // -------------------------------------------------------------
        function onReceivedLessons(data) {

            vm.lesson = data[vm.lessonNo - 1];
            if (vm.lesson == null) {

                return redirect();

            } else {

                vm.isLast = (data.length === vm.lessonNo);
                vm.lessonCount = data.length;
                vm.courseFinished = isCourseFinished();

                storageService.setCurrentLesson(vm.lessonNo);

                $log.info("[Lesson " + vm.lessonNo +  "] Starting lesson \"" + vm.lesson.title + "\".");
                setCurrentStage();
            }

        }

        // -------------------------------------------------------------
        function onError(reason) {
            $log.error(reason);
        }

        // -------------------------------------------------------------
        function onReceivedOutput(data) {

            if (data instanceof Object
                && data.hasOwnProperty("command")
                && data.hasOwnProperty("output")
                && data.hasOwnProperty("exitCode")) {

                if (data.exitCode != 0) {
                    $log.error("Response return value suggests that an error has occured with Git command.\n Output: " + data.output);
                    sendToOutput("An error occured with executing your command. Please report this to administrators of the website.");
                } else {

                    sendToOutput(data.output);
                    if (isExpectedCommand(data.command)) {
                        finishStage();
                    }
                }

            } else {
                $log.error("Server error occured.\n Received response: " + data);
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
        function goNext() {
            //if (!vm.isLast) {
                return $location.path(CONFIG.LESSON_URI + (vm.lessonNo + 1));
           // }
        }

        // -------------------------------------------------------------
        function goPrevious() {
            if (vm.lessonNo - 1 > 0) {
                return $location.path(CONFIG.LESSON_URI + (vm.lessonNo - 1));
            }
        }

        // -------------------------------------------------------------
        function isCourseFinished() {
            return (storageService.getFinishedLessons().length === vm.lessonCount);
        }

        // -------------------------------------------------------------
        function executePrerequisiteScripts() {

            if (vm.currentStage.hasOwnProperty("prerequisites")) {

                if (vm.currentStage["prerequisites"].constructor === Array) {

                    var prerequisites = vm.currentStage["prerequisites"];
                    for (var i = 0; i < prerequisites.length; i++) {

                        var prereq = prerequisites[i];
                        serverService.executeScript(prereq)
                            .then(function(response) {
                                $log.info("[Lesson " + vm.lessonNo +  "] Executed prerequisite script '" + prereq + "'.")
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

                        $log.info("[Lesson " + vm.lessonNo +  "] Starting stage nr " + stageCounter);
                        vm.currentStage = vm.lesson["stages"][i];

                        executePrerequisiteScripts();
                    }
                }
            }
        }

        // -------------------------------------------------------------
        function finishStage() {

            $log.info("[Lesson " + vm.lessonNo +  "] Finishing stage nr " + stageCounter);
            if (stageCounter < vm.lesson["stages"].length - 1) {
                stageCounter++;
                setCurrentStage();
            } else {

                // TODO: finishLesson - sens zmiennej vm.finished
                vm.finished = true;
                $log.info("[Lesson " + vm.lessonNo +  "] Finishing lesson \"" + vm.lesson.title + "\".");

                storageService.setCurrentLesson(vm.lessonNo + 1);
                storageService.setLessonAsFinished(vm.lessonNo);

                vm.courseFinished = isCourseFinished();

                lessonFinishedInfo();
            }

        }

        // -------------------------------------------------------------
        // TODO: Wypada przemyśleć, jak sprawdzać poprawność oczekiwanych komend (zwłaszcza git commit, który może mieć dowolny tekst jako message"
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

        // -------------------------------------------------------------
        function lessonFinishedInfo() {

            var title = "Lekcja ukończona";
            var message = "Udało Ci się zakończyć lekcje! Aby kontynuować, naciśnij przycisk Kontynuuj";

            var modalInstance = modalService.createModal(title,  message, "Kontynuuj", "", false);

            modalInstance.result.then(function(result) {

                if (vm.isLast) {
                    finishCourse();
                } else {
                    goNext();
                }

            });

        }

        // -------------------------------------------------------------
        function finishCourse() {

            if (!vm.courseFinished) {

                var title = "Zakończenie kursu";
                var message = "Ukończyłeś ostatnią lekcję, ale wciąż masz niedokończone lekcje. Możesz zakończyć kurs teraz albo anulować akcję i wrócić do pozostałych lekcji";

                var modalInstance = modalService.createModal(title,  message, "Zakończ");

                modalInstance.result.then(function(result) {

                    storageService.removeCurrentLesson();
                    return $location.path('/');

                });

            } else {

                storageService.removeCurrentLesson();
                return $location.path('/');

            }
        }

        // -------------------------------------------------------------
        function resetCourse() {

            var title = "Zakończenie kursu";
            var message = "Czy na pewno chcesz zakończyć kurs? Twoje postępy zostaną zresetowane.";

            var modalInstance = modalService.createModal(title,  message);

            modalInstance.result.then(function(result) {

                storageService.removeCurrentLesson();
                storageService.resetFinishedLessons();
                return $location.path('/');

            });

        };
    }

})();