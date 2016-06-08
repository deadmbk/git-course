<?php
require 'lesson14.php';

//////////////////////////////////////
/////// Lesson 15 workspace set ///////
//////////////////////////////////////

executeCommand("git flow feature start T1");
executeCommand("git flow feature publish T1");
executeCommand("git flow feature finish T1");

?>
