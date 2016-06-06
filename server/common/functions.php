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
    }

}

function resetWorkspace($workspace) {
    delete_directory($workspace);

    if (mkdir($workspace)) {
        chmod($workspace, 0777);
    }

}

function setWorkspace($workspace) {
    chdir($workspace);
}

function createFile($filename, $content) {
    return file_put_contents($filename, $content);
}

function executeCommand($requestCommand) {

    $output = array();
    $result = array();
    $returnVar;

    $command = replaceFirstOccurrence(escapeshellcmd($requestCommand), 'git')  . " 2>&1";
    exec($command, $output, $returnVar);

    $result['command'] = $requestCommand;
    $result['output'] = implode("\n", $output);
    $result['exitCode'] = $returnVar;

    return $result;
}

function replaceFirstOccurrence($haystack, $needle) {

    $pos = stripos($haystack, $needle);
    if ($pos !== false) {
        return substr_replace($haystack, GIT_BIN, $pos, strlen($needle));
    }

    return $haystack;
}

?>