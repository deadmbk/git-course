<?php
require 'lesson11.php';

//////////////////////////////////////
/////// Lesson 12 workspace set ///////
//////////////////////////////////////

executeCommand("git branch cleared");
executeCommand("git checkout cleared");
executeCommand("git rm A.txt");
executeCommand("git add -A");
executeCommand("git commit -m \"my next commit\"");
executeCommand("git checkout master");

?>
