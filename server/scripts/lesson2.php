<?php
require 'lesson1.php';

//////////////////////////////////////
/////// Lesson 2 workspace set ///////
//////////////////////////////////////

$name = "document.txt";
$data = "This is a text file used to teach people how to properly add and commit files.";

executeCommand("git init");

createFile($name, $data);

?>
