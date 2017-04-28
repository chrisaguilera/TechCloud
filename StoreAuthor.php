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

$raw_author = isset($_POST['author']) ? $_POST['author'] : '';

if(!in_array($raw_author, $_SESSION['authors'])) {
	$_SESSION['authors'][] = $raw_author;
}
if(!in_array($raw_author, $_SESSION['prevSearches'])) {
	$_SESSION['prevSearches'][] = $raw_author;
}

echo json_encode($_SESSION['authors']);

?>