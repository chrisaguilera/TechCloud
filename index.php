<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>TechCloud Home</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- <script src="APIHandler.js"></script> -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/index.css">
	<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>
<body>
	<h1 id="mainHeader">Welcome to TechCloud</h1>
	<div class="container">
		<div class="form-group">
			<input class="form-control" id="input-text" list="previoussearchlist" aria-describedby="emailHelp" placeholder="Enter Artist" autocomplete="off"></input>
			<datalist id="previoussearchlist"></datalist>
		</div>

		<div class="radio">
			<form>
			    <label class="radio-inline">
			      <input type="radio" name="optradio" id="nameRadio" checked="true">Search by Name
			    </label>
			    <label class="radio-inline">
			      <input type="radio" name="optradio" id="keywordRadio">Search by Keyword Phrase
			    </label>
			</form>
		</div>
		<button class="search-button btn pull-left" type="search"> Search </button>
	</div>

	<script type="text/javascript">

		// function checkRadio(){
		// 	if (document.getElementById('nameRadio').checked){
		// 		console.log('name is checked');
		// 	} else if (document.getElementById('keywordRadio')){
		// 		console.log('keywordRadio');
		// 	}
		// }

		$(document).ready(function(){
			
			$(".search-button").click(function() {
				// Check whether the search is valid before storing
				var inputField = document.getElementById("input-text");

				var request = $.ajax({
					url: "StoreSearch.php",
					type: "POST",
					data: {search : inputField.value},
					dataType: "text"
				});
				request.done(function(msg) {
					console.log(msg);
				});
			})
		});

	</script>
</body>
</html>