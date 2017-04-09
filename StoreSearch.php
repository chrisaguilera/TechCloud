<?php
// Start the session
session_start();

if(!isset($_SESSION['prevSearches'])) {
	$_SESSION['prevSearches'] = [];
}

$raw_search = isset($_POST['search']) ? $_POST['search'] : '';

if(!in_array($raw_search, $_SESSION['prevSearches'])) {
	$_SESSION['prevSearches'][] = $raw_search;
}

$searches;
foreach ($_SESSION['prevSearches'] as &$search) {
	$searches .= $search . " ";
}

echo $searches;

?>