<?php
require 'lesson7.php';

//////////////////////////////////////
/////// Lesson 8 workspace set ///////
//////////////////////////////////////

executeCommand("git reset document.txt");
executeCommand("git checkout document.txt");

resetWorkspace(REPO_DIR);
setWorkspace(REPO_DIR);

executeCommand("git init --bare");

?>
