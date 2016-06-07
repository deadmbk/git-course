<?php
require 'lesson8.php';

//////////////////////////////////////
/////// Lesson 9 workspace set ///////
//////////////////////////////////////

resetWorkspace(CLIENT_DIR);
setWorkspace(CLIENT_DIR);

executeCommand("git clone " . REPO_DIR . " .");
createFile("newFile.txt", "Nothing to see here..");
executeCommand("git add *");
executeCommand("git commit -m \"Added newFile.txt\"");
executeCommand("git push origin master");

// ------------------------------------
setWorkspace(COURSE_DIR);
executeCommand("git remote add origin " . REPO_DIR);

?>
