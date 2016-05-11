<?php

   // header('Content-type', 'application/json; charset=iso-8859-2');
   header('Content-Type: text/html; charset=UTF-8');
    define("GIT_BIN", '"D:/Program Files x86/Git/bin/git.exe"');

    $requestCommand = trim(stripslashes($_GET['cmd']));
    $command = replaceFirstOccurrence($requestCommand, 'git');

//    print '<pre>' . $command . '</pre>';
//    print '<pre>' . escapeshellcmd($command) . '</pre>';
//    print '<pre>' . replaceFirstOccurrence($command, 'git') . '</pre>';
//    print '<pre>' . escapeshellcmd(replaceFirstOccurrence($command, 'git')) . '</pre>';


    $arr = array();
    $return_var = NULL;

    $locale = 'pl_PL.1250';
    setlocale(LC_ALL, "");
    putenv('LC_ALL=""');

    $var = shell_exec($command . " 2>&1");//, $arr, $return_var);
//    print $return_var;

//    print '<pre>';
    print $var;
    print "<br>";
    print substr($var, 69, 1);
    print "<br>";
    print str_replace('ę', 'e', $var);
    print "<br>";
    print mb_convert_encoding($var, 'utf-8', 'latin2');
    print "<br>";
    print preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $var);
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