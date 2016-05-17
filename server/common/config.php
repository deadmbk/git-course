<?php

$config = parse_ini_file("../config.ini");

define("GIT_BIN", '"' . $config['git_path'] . '"');
define("COURSE_DIR", $config['course_directory']);