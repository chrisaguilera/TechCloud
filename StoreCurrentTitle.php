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
	$_SESSION['currentTitle'] = ;
}

$raw_title = isset($_POST['title']) ? $_POST['title'] : '';

$_SESSION['currentTitle'] = $raw_title;

echo $_SESSION['currentTitle'];

?>