var myApp = angular.module('myApp', ['ng-terminal-example']);

myApp.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
    terminalConfigurationProvider.outputDelay = 0;
    terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);

myApp.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.$broadcast('terminal-output', {
            output: true,
            text: ['Welcome to vtortola.GitHub.io',
                'This is an example of ng-terminal-emulator.',
                '',
                "Please type 'help' to open a list of commands"],
            breakLine: true
        });

    $scope.$on('terminal-input', function (e, consoleInput) {

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


        var cmd = consoleInput[0];
       // console.log(cmd.command);

        $http.get('app/cli.php?cmd=' + cmd.command)
            .then(function(response) {

                $scope.$broadcast('terminal-output', {
                    output: true,
                    text: [response.data.output],
                    breakLine: true
                });

                console.log(response.data);
            });
        // do stuff


    });


}]);