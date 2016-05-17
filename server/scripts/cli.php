<?php
require '../common/functions.php';

setWorkspace();



//    print '<pre>' . $command . '</pre>';
//    print '<pre>' . escapeshellcmd($command) . '</pre>';
//    print '<pre>' . replaceFirstOccurrence($command, 'git') . '</pre>';
//    print '<pre>' . escapeshellcmd(replaceFirstOccurrence($command, 'git')) . '</pre>';

$requestCommand = trim(stripslashes($_GET['cmd']));
$var = executeGitCommand($requestCommand);//, $arr, $return_var);

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