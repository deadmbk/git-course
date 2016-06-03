<?php
require 'config.php';

function delete_directory($dir) {

    try {

        $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);

        foreach($files as $file) {

            if ($file -> isDir()) {
                rmdir($file -> getRealPath());
            } else {
                chmod($file -> getRealPath(), 0777);
                unlink($file->getRealPath());
            }
        }

        rmdir($dir);

    } catch(UnexpectedValueException $e) {
       //print "Provided path does not exist or is not directory.";
    }

}

function resetWorkspace() {
    delete_directory(COURSE_DIR);

    mkdir(COURSE_DIR);
    chmod(COURSE_DIR, 0777);
}

function setWorkspace() {
    chdir(COURSE_DIR);
}

function createFile($filename, $content) {
    return file_put_contents($filename, $content);
}

function executeGitCommand($requestCommand) {

    $output = array();
    $result = array();
    $returnVar;

    $command = replaceFirstOccurrence(escapeshellcmd($requestCommand), 'git')  . " 2>&1";
    exec($command, $output, $returnVar);

    $result['command'] = $requestCommand;
    $result['output'] = implode("\n", $output);
    $result['exitCode'] = $returnVar;

//    print '<pre>';
//    print_r($output);
//    print '</pre>';
//
//    print 'ReturnVar: ' . $returnVar;

    return $result;//shell_exec($command . " 2>&1");

}

function replaceFirstOccurrence($haystack, $needle) {

    $pos = stripos($haystack, $needle);
    if ($pos !== false) {
        return substr_replace($haystack, GIT_BIN, $pos, strlen($needle));
    }

    return $haystack;
}

?>