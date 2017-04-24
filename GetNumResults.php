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
if(!isset($_SESSION['numResults'])) {
	$_SESSION['numResults'] = '';
}

echo json_encode($_SESSION['numResults']);

?>