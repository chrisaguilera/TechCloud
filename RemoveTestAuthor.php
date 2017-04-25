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

$raw_author = 'Test Author';

if(in_array($raw_author, $_SESSION['authors'])) {
	unset($_SESSION['authors'][array_search($raw_author, $_SESSION['authors'])]);
}

echo json_encode($_SESSION['authors']);

?>