<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>TechCloud Home</title>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/wordcloud.css">
	<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
</head>
<body>
	<div class="container-fluid">

	<div class="header">
		<h1 id="mainHeader">WordCloud</h1>
	</div>
	<div class="content">
	  	<p id="wordcloudparagraph"></p>
	  	<div class="form-group">
	  		<input class="form-control" id="input-text" list="previoussearchlist" aria-describedby="emailHelp" placeholder="Enter Search Term" autocomplete="off">
	  		<datalist id="previoussearchlist"></datalist>
	  	</div>
	  	<div id="buttonclass">
	  		<button class="btn">Add </button>
	  		<button class="btn">Search</button>
	  		<button class="btn" onclick="myFunction();">click me </button>
	  	</div>
	</div>
<!-- <center><button class="add-button btn pull-right" type="search"> Add </buton><button class="search-button btn pull-right" type="search"> Search </buton></center> -->
<!-- <button onclick="myFunction()">click me</button> -->
</body>
<script>

	function myFunction() {

		var arr = [["door", 5], ["building",4] , ["and",4] , ["the",3] , ["boy",3] , ["screamed",2] , ["wolf",2] , ["kobyashi", 2], ["meru",2]];
	    
	    //Different font sizes
	    var fontSizes = [ "10px", "20px", "30px", "40px", "50px", "60px", "70px", "80px", "90px", "100px"];

	    var big_freq = arr[0][1]; //the number of the biggest frequency goes here

	    arr = shuffle(arr);

	    for(count = 0; count < arr.length; count++) {//Change this to iterate through the loop

	        var freq = arr[count][1]; //frequency of word you working on

	        var t = document.createTextNode(arr[count][0] + " "); //creating the text node

	        var span = document.createElement('span');//creating a span

	        var calc = freq/big_freq;
	        if (calc == 1) {
	          span.style.fontSize = fontSizes[9];
	        }
	        else if (calc < 1 && calc >= .875) {
	            span.style.fontSize = fontSizes[8];
	        }
	        else if (calc < .875 && calc >= .75) {
	            span.style.fontSize = fontSizes[7];
	        }
	        else if (calc < .75 && calc >= .625) {
	            span.style.fontSize = fontSizes[6];
	        }
	        else if (calc < .625 && calc >= .50) {
	            span.style.fontSize = fontSizes[5];
	        }
	        else if (calc < .50 && calc >= .375) {
	            span.style.fontSize = fontSizes[4];
	        }
	        else if (calc < .375 && calc >= .25) {
	            span.style.fontSize = fontSizes[3];
	        }
	        else if (calc < .25 && calc >= .125) {
	            span.style.fontSize = fontSizes[2];
	        }
	        else if (calc < .125 && calc >= .0) {
	            span.style.fontSize = fontSizes[1];
	        }

	        span.style.color = getRandomColor(); //changing color
	        span.appendChild(t); //adding text to span
	        span.onclick = function() {
						this.innerHTML = "";
	          //var word = this.innerHTML;

	          //console.log("Word clicked from Word Cloud Page: " + word);

	        /*  var request = $.ajax({
	            url: "SetWord.php",
	            type: "POST",
	            data: {word : word},
	            dataType: "text"
	          });

	          request.done(function(msg) {

	            // console.log(msg);
	            window.location.href = "songListPage.php";
	          });*/
	        }

	        //console.log(document.getElementById("something"));
	        document.getElementById("wordcloudparagraph").appendChild(span);//adding span to element
	    }
			

	}

	function getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

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

			// Check whether the search is valid before storing
			var inputField = document.getElementById("input-text");

			var request = $.ajax({
				url: "StoreSearch.php",
				type: "POST",
				data: {search : inputField.value},
				dataType: "text"
			});
			request.done(function(msg) {
				populatePreviousSearches();
			});
		})
	});

</script>

</html>