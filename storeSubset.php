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

$raw_subset = isset($_POST['subset']) ? $_POST['subset'] : '';

if(!in_array($raw_subset, $_SESSION['subsets'])) {
	$_SESSION['subsets'][] = $raw_subset;
}

echo json_encode($_SESSION['subsets']);

?>
