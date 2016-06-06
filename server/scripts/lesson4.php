<?php
require 'lesson3.php';

//////////////////////////////////////
/////// Lesson 4 workspace set ///////
//////////////////////////////////////

$name = "document.txt";
$data = "This is a text file used to teach people how to properly add and commit files.";

executeCommand("git init");

createFile($name, $data);

?>
