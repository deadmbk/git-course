<?php
require 'lesson4.php';

//////////////////////////////////////
/////// Lesson 5 workspace set ///////
//////////////////////////////////////

executeCommand("git add document.txt");
executeCommand("git commit -m \"First commit\"");

createFile("A.txt", "Content A");
createFile("B.txt", "Content B");
createFile("C.txt", "Content C");

createFile("document.txt", "\nModified content on new line.");

?>
