<?php
require '../common/functions.php';
header('Content-type', 'application/json; charset=utf-8');

setWorkspace();

$requestCommand = trim(stripslashes($_GET['cmd']));

$result = executeGitCommand($requestCommand);
print json_encode($result);

//    print '<pre>' . $requestCommand . '</pre>';
//    print '<pre>' . escapeshellcmd($requestCommand) . '</pre>';
//    print '<pre>' . replaceFirstOccurrence($requestCommand, 'git') . '</pre>';
//    print '<pre>' . escapeshellcmd(replaceFirstOccurrence($requestCommand, 'git')) . '</pre>';

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
//    print utf8_encode($var);;
//    print '</pre>';

//$response = array();
//$response['command'] = $requestCommand;
//$response['output'] = $result;
//
////    print '<pre>';
////    print_r($response);
////    print '</pre>';
//
//print json_encode($response);

?>