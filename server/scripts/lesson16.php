<?php
require 'lesson15.php';

//////////////////////////////////////
/////// Lesson 16 workspace set ///////
//////////////////////////////////////

executeCommand("git flow release start R1");
executeCommand("git flow release publish R1");
executeCommand("git flow release finish R1 -m \"R1\"");

?>
