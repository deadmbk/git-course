<?php
require '../common/functions.php';

//////////////////////////////////////
/////// Lesson 2 workspace set ///////
//////////////////////////////////////

$name = "document.txt";
$data = "This is a text file used to teach people how to properly add and commit files.";

resetWorkspace();
setWorkspace();
executeGitCommand("git init");

createFile($name, $data);
