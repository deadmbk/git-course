<?php

$config = array();
$config = parse_ini_file("../config.ini");

define("COURSE_DIR", $config['course_directory']);
chdir(COURSE_DIR);

$data = "This is a text file used to teach people how to properly add and commit files.";
file_put_contents("document.txt", $data);

$response = array();
$response['output'] = "Created text file";

print json_encode($response);