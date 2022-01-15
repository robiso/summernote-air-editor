<?php
/**
 * Summernote editor plugin.
 *
 * It transforms all the editable areas into the Summernote air inline editor.
 *
 * @author Prakai Nadee <prakai@rmuti.acth>
 * @forked by Robert Isoski @robertisoski
 * @forked by Stephan Stanisic @StephanStanisic
 * @version 3.0.0
 */

global $Wcms;

if (defined('VERSION')) {
    define('version', VERSION);
    defined('version') OR die('Direct access is not allowed.');
}

$Wcms->addListener('js', 'loadSummerNoteAirJS');
$Wcms->addListener('css', 'loadSummerNoteAirCSS');
$Wcms->addListener('editable', 'initialSummerNoteAirVariables');

function initialSummerNoteAirVariables($contents) {
    global $Wcms;
    $content = $contents[0];
    $subside = $contents[1];

    $contents_path = $Wcms->getConfig('contents_path');
    if (!$contents_path) {
        $Wcms->setConfig('contents_path', $Wcms->filesPath);
        $contents_path = $Wcms->filesPath;
    }
    $contents_path_n = trim($contents_path, "/");
    if ($contents_path != $contents_path_n) {
        $contents_path = $contents_path_n;
        $Wcms->setConfig('contents_path', $contents_path);
    }
    $_SESSION['contents_path'] = $contents_path;

    return array($content, $subside);
}

function loadSummerNoteAirJS($args) {
    global $Wcms;
    if ($Wcms->loggedIn) {
        $script = <<<EOT
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" integrity="sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.8/dist/summernote.min.js" integrity="sha384-rv18XCwOLyh2rO/6Vz9eKWaSP+ljKfFed/npYlSg476id+996jfNDF+5iC3W5KKJ" crossorigin="anonymous"></script>
        <script src="{$Wcms->url('plugins/summernote-air-editor/js/admin.js')}" type="text/javascript"></script>
        <script src="{$Wcms->url('plugins/summernote-air-editor/js/files.js')}" type="text/javascript"></script>
EOT;
        $args[0] .= $script;
    }
    return $args;
}

function loadSummerNoteAirCSS($args) {
    global $Wcms;
    if ($Wcms->loggedIn) {
        $script = <<<EOT
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.11/dist/summernote.css" integrity="sha384-hHEPAd3Dkb316VuNPtIZ6LUrzxvD4PQOTW478Ww6c/aUJKXNDV9pEx5/jZgISR1G" crossorigin="anonymous">
        <link rel="stylesheet" href="{$Wcms->url('plugins/summernote-air-editor/css/admin.css')}" type="text/css" media="screen">
EOT;
        $args[0] .= $script;
    }
    return $args;
}
