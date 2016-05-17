# git-course

## Opis
Projekt powstał w celu zaliczenia przedmiotu na ostatnim semestrze. Korzystasz na własną odpowiedzialność.

### Jak to działa?
Korzystamy z terminala dostępnego tutaj https://github.com/vtortola/ng-terminal-emulator. Idea polega na tym, że wykorzystujemy Git zainstalowany na serwerze (czyli lokalnie) do wywoływania komend Gita. Aplikacja w angularze pobiera rzeczy wpisane w terminalu i wysyła do skryptu PHP na serwerze, który następnie wykonuje polecenia za pomocą wbudowanej funkcji. Następnie zwraca rezultat do klienta. 
Lekcje są zapisane w formie plików JSON w folderze /resources/lessons. Każda lekcja może zawierać kilka etapów (stage'y), a każdy z nich zawiera opis ćwiczenia, dozwolone komendy oraz komendę kończącą etap.

## Wymagania
- PHP
- Node.js
- Bower (chyba opcjonalnie*)
- Grunt (chyba opcjonalnie*)
- Git

*Z tego co pamiętam, Node.js zainstaluje te narzędzia lokalnie i będą działały w obrębie projektu, ale nie wiem czy polecenia zadziałają z konsoli. Warto zainstalować je globalnie komendą npm install -g bower i npm install -g grunt.

### PHP
PHP jest potrzebny do wykonywania poleceń po stronie serwera. Konieczna jest wersja >5.4 ze względu na wbudowany serwer. Musi znajdować się w PATH.

### Node.js
Node Package Manager (npm) zarządza pakietami i narzędziami Javascriptu. Za jego pomocą instalujemy Bowera i Grunta oraz kilka wtyczek powiązanych z tym drugim. Plik konfiguracyjny to package.json. Zainstalowane narzędzia znajdują się w /node_modules.

### Bower
Bower jest managerem do zarządzania paczkami webowymi. Instaluje Angulara i Bootstrapa. Jego plik konfiguracyjny (bower.json) znajduje sie w katalogu głównym projektu, a zainstalowane biblioteki w /bower_components.

### Grunt
Grunt jest systemem do automatyzacji pracy. Z jego pomocą można definiować zadania, które pozwolą na automatyczne wykonywanie pewnych czynności. Dzięki niemu po dodaniu nowego pliku js lub css można szybko wrzucić go do index.html. Grunt odpala także wbudowany serwer PHP, który przyjmuje komendy.

### Git
System kontroli wersji, wokół którego obraca się ten projekt. Git jest potrzebny na serwerze, aby można było wykonywać jego komendy w ramach tworzonego kursu.

## Instalacja
1. Zainstalować Node.js (i dodać do PATH).
2. Zainstalować PHP w wersji >5.4 (i dodać do PATH).
3. Pobrać oraz wrzucić projekt do wybranego katalogu.
4. Będąc w katalogu projektu w konsoli wykonać polecenie npm install - zostaną zainstalowane Bower i Grunt
	a) to polecenie wywoła także polecenie bower install, które zainstaluje paczki Bowera
	b) jeśli tak się nie stało, warto zainstalować Bowera (i Grunta) globalnie komendą npm install -g bower
5. Skonfigurować plik server/config.ini podając ścieżkę do zainstalowanego Gita oraz katalog, gdzie kurs będzie tworzył pliki.
6. Odpalić serwer poleceniem grunt start.

Ponieważ funkcja wywołująca komendy jako właściciela widzi serwer, może się zdarzyć, że projekt nie zadziała ze względu na brak dostępu.

## Dodawanie funkcjonalności

1. Po pullu warto uruchomić polecenie npm install.
2. Po dodaniu nowego pliku js lub css można uruchomić polecenie grunt, żeby automatycznie dołączyć je do index.html.
