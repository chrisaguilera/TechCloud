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
if(!isset($_SESSION['numResults'])) {
	$_SESSION['numResults'] = '';
}

$raw_num = isset($_POST['num']) ? $_POST['num'] : '';

$_SESSION['numResults'] = $raw_num;

echo ($_SESSION['numResults']);

?>