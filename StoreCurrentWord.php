<?php
// Start the session
session_start();

if(!isset($_SESSION['prevSearches'])) {
	$_SESSION['prevSearches'] = [];
}
if(!isset($_SESSION['authors'])) {
	$_SESSION['authors'] = [];
}
if(!isset($_SESSION['keywords'])) {
	$_SESSION['keywords'] = [];
}
if(!isset($_SESSION['currentTitle'])) {
	$_SESSION['currentTitle'] = '';
}
if(!isset($_SESSION['currentWord'])) {
	$_SESSION['currentWord'] = '';
}

$raw_word = isset($_POST['word']) ? $_POST['word'] : '';

$_SESSION['currentWord'] = $raw_word;

echo ($_SESSION['currentWord']);

?>