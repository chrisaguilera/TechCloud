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

echo ($_SESSION['currentWord']);

?>