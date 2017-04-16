<?php
// Start the session
session_start();

if(!isset($_SESSION['authors'])) {
	$_SESSION['authors'] = [];
}

echo json_encode($_SESSION['authors']);

?>