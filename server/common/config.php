<?php
$config = parse_ini_file("../config.ini");

error_reporting($config['error_reporting']);

define("GIT_BIN", '"' . $config['git_path'] . '"');
define("COURSE_DIR", $config['course_directory']);
define("REPO_DIR", $config['course_repo']);
define("CLIENT_DIR", $config['course_client']);
?>