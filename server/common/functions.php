<?php
require 'config.php';

function delete_files($target) {

    if(is_dir($target)){

        $files = glob($target . '*', GLOB_MARK); //GLOB_MARK adds a slash to directories returned

        foreach($files as $file) {
            delete_files($file);
        }

        rmdir($target);

    } elseif(is_file($target)) {
        unlink($target);
    }

}

function resetWorkspace() {
    delete_files(COURSE_DIR);
    mkdir(COURSE_DIR);
}

function setWorkspace() {
    chdir(COURSE_DIR);
}

function createFile($filename, $content) {
    return file_put_contents($filename, $content);
}
