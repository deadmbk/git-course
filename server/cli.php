<?php

    $config = array();
    $config = parse_ini_file("config.ini");


   // header('Content-type', 'application/json; charset=iso-8859-2');
   //header('Content-Type: text/html; charset=UTF-8');
    define("GIT_BIN", '"' . $config['git_path'] . '"');
    define("COURSE_DIR", $config['course_directory']);

    $requestCommand = trim(stripslashes($_GET['cmd']));
    $command = replaceFirstOccurrence($requestCommand, 'git');

//    print '<pre>' . $command . '</pre>';
//    print '<pre>' . escapeshellcmd($command) . '</pre>';
//    print '<pre>' . replaceFirstOccurrence($command, 'git') . '</pre>';
//    print '<pre>' . escapeshellcmd(replaceFirstOccurrence($command, 'git')) . '</pre>';

    $arr = array();
    $return_var = NULL;

    $locale = 'pl_PL.UTF-8';
    //$locale = 'fr_FR.UTF-8';
    setlocale(LC_ALL, $locale);
    putenv('LC_ALL='.$locale);

    chdir(COURSE_DIR);
    $var = shell_exec($command . " 2>&1");//, $arr, $return_var);
//    print $return_var;

    //print_r($arr);
    //$var = implode($arr);

//    print '<pre>';
//    print $var;
//    print "<br>";
//    print substr($var, 69, 1);
//    print "<br>";
//    print str_replace('ę', 'e', $var);
//    print "<br>";
//    print mb_convert_encoding($var, 'utf-8', 'latin2');
//    print "<br>";
//    print preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $var);
//    print "<br>";
//    print utf8_encode($var);
//    var_dump($arr);
//    print '</pre>';

    $response = array();
    $response['command'] = $requestCommand;
    $response['output'] = $var;

//    print '<pre>';
//    print_r($response);
//    print '</pre>';

    print json_encode($response);

    // --------------------------------------------------

    function replaceFirstOccurrence($haystack, $needle) {

        $pos = stripos($haystack, $needle);
        if ($pos !== false) {
            return substr_replace($haystack, GIT_BIN, $pos, strlen($needle));
        }

        return $haystack;
    }
?>