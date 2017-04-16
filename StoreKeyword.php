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

$raw_keyword = isset($_POST['keyword']) ? $_POST['keyword'] : '';

if(!in_array($raw_keyword, $_SESSION['keywords'])) {
	$_SESSION['keywords'][] = $raw_keyword;
}
if(!in_array($raw_keyword, $_SESSION['prevSearches'])) {
	$_SESSION['prevSearches'][] = $raw_keyword;
}

echo json_encode($_SESSION['prevSearches']);

?>