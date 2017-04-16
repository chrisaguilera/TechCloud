<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>TechCloud Home</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- <script src="APIHandler.js"></script> -->
	<script src = "IEEEHandler.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/index.css">
	<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>
<body>
	<h1 id="mainHeader">Welcome to TechCloud</h1>
	<div class="container">
		<div class="form-group">
			<input class="form-control" id="input-text" list="previoussearchlist" aria-describedby="emailHelp" placeholder="Enter Search Term" autocomplete="off"></input>
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

		function checkRadio(){
			if (document.getElementById('nameRadio').checked){
				console.log('name is checked');
			} else if (document.getElementById('keywordRadio')){
				console.log('keywordRadio');
			}
		}

		printResultsForAuthor("halfond");

		function populatePreviousSearches() {

			var request = $.ajax({
				url: "GetPrevSearches.php",
				type: "GET",
				dataType: "JSON"
			});
			request.done(function(msg) {
				array = msg;

				if (array.length != 0){
					var datalisthtml = '';
					for (var i = 0; i < array.length; i++){
						datalisthtml += '<option value="' + array[i] + '">';
					}
					console.log(datalisthtml);
					document.getElementById('previoussearchlist').innerHTML = datalisthtml;
				}
			});
		}

		$(document).ready(function(){

			populatePreviousSearches();

			$(".search-button").click(function() {

				var inputField = document.getElementById("input-text");

				if (document.getElementById('nameRadio').checked){

					var request = $.ajax({
						url: "StoreAuthor.php",
						type: "POST",
						data: {author : inputField.value},
						dataType: "text"
					});
					request.done(function(msg) {
						populatePreviousSearches();
					});

				} else if (document.getElementById('keywordRadio')){
					var request = $.ajax({
						url: "StoreKeyword.php",
						type: "POST",
						data: {keyword : inputField.value},
						dataType: "text"
					});
					request.done(function(msg) {
						populatePreviousSearches();
					});
				}


			})
		});

	</script>
</body>
</html>