<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Word Cloud</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/wordcloud.css">
	<style>
	#myProgress {
		border-radius: 5px;
	    width: 100%;
	    background-color: lightgrey;
	}
	#myBar {
		border-radius:	5px;
	    width: 1%;
	    height: 30px;
	    background-color: rgb(0,174,85);
	}
	#wordcloudparagraph {
		letter-spacing: -1.25px;
		line-height: 280%;
	}
	</style>
	<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
	<script src="html2canvas.js"></script>
	<script src="FileSaver.js"></script>
	<script src="IEEEHandler.js"></script>

</head>
<body>
	<div class="container-fluid">

	<div class="header">
		<h1 id="mainHeader">WordCloud</h1>
	</div>
	<div class="content">
		<div id="myProgress">
  <div id="myBar"></div>
</div>
	  	<p id="wordcloudparagraph"></p>
	  	<div class="form-group">
	  		<input class="form-control" id="input-text" list="previoussearchlist" aria-describedby="emailHelp" placeholder="Enter Search Term" autocomplete="off">
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
	  	<div id="buttonclass">
	  		<button class="add-button btn" type="add">Add</button>
	  		<button name="search-button" class="search-button btn" type="search">Search</button>
	  		<button class="btn" id = "download" onclick="downloadImage();">Download Image</button>
				<button onclick="shit()">click me</button>
	  	</div>
	</div>
<!-- <center><button class="add-button btn pull-right" type="search"> Add </buton><button class="search-button btn pull-right" type="search"> Search </buton></center> -->


<script type= "text/javascript">


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function shit() {
	findPaper("web");
}

function abstractTest(authors) {
	move(50,1);


	setTimeout(function(){printResultsForAuthor(authors, 0);
		move(100,50);
	setTimeout(function(){link.style.display = 'none'; }, 900);
	}, 900);

	var link = document.getElementById('myProgress');
	//
	//link.style.display = 'none';
}

function move(num, start) {
    var elem = document.getElementById("myBar");
    var width = start;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= num) {
            clearInterval(id);
        } else {
            width+=2;
            elem.style.width = width + '%';
        }
    }
		//wait(5000);
}

function subsetWordcloud(array) {
	console.log(array);
	printResultsForTitle(array,0);
}

	function downloadImage() {

		var div = document.getElementById('wordcloudparagraph');
		html2canvas((div), {
			onrendered: function(canvas){
				var img = canvas.toDataURL("image/png");
				downloadURI("data:" + img, "wordcloud.png");
			}
		});
	}

	function downloadURI(uri, name) {
    	var link = document.createElement("a");
    	link.download = name;
    	link.href = uri;
    	document.body.appendChild(link);
    	link.click();
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

		// Stuff for word cloud
		var subsetArray;

		var request = $.ajax({
			url: "GetSubsetBool.php",
			type: "GET",
			dataType: "JSON"
		});
		request.done(function(something) {
			var truth = something;
			console.log(truth);

			if (truth) {
				//console.log("here1!!!!");
				var request = $.ajax({
					url: "GetSubset.php",
					type: "GET",
					dataType: "JSON"
				});
				request.done(function(something2) {
					subsetArray = something2;
					//console.log(subsetArray);
					var docTitle = "";
					for (i = 0; i < subsetArray.length; i++) {
						if (i != subsetArray.length - 1) {
							docTitle += subsetArray[i] + ", ";
						} else {
							docTitle += subsetArray[i] + "";
						}
					}
					document.title = docTitle;
					subsetWordcloud(subsetArray);

				});
			}
			else {
				var authorArray;
				var request = $.ajax({
					url: "GetAuthors.php",
					type: "GET",
					dataType: "JSON"
				});
				request.done(function(msg) {
					authorArray = msg;
					var docTitle = "";
					for (i = 0; i < authorArray.length; i++) {
						if (i != authorArray.length - 1) {
							docTitle += authorArray[i] + ", ";
						} else {
							docTitle += authorArray[i] + "";
						}
					}
					document.title = docTitle;
					abstractTest(authorArray);
					console.log(msg);
				});
			}
		});




		$(".search-button").click(function() {
			$.ajax({
				url: "StoreSubsetBool.php",
				type: "POST",
				data: {bool : "false"},
				dataType: "text"
			});
			var inputField = document.getElementById("input-text");

			var request0 = $.ajax({
				url: "NewSearch.php",
			});
			request0.done(function(msg) {
				populatePreviousSearches();
			});

			if (document.getElementById('nameRadio').checked){

				var request = $.ajax({
					url: "StoreAuthor.php",
					type: "POST",
					data: {author : inputField.value},
					dataType: "text"
				});
				request.done(function(msg) {
					window.location.href = "wordcloud.php";
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
					window.location.href = "wordcloud.php";
					populatePreviousSearches();
				});
			}


		})

		$(".add-button").click(function() {
			$.ajax({
				url: "StoreSubsetBool.php",
				type: "POST",
				data: {bool : "false"},
				dataType: "text"
			});
			var inputField = document.getElementById("input-text");

			if (document.getElementById('nameRadio').checked){

				var request = $.ajax({
					url: "StoreAuthor.php",
					type: "POST",
					data: {author : inputField.value},
					dataType: "text"
				});
				request.done(function(msg) {
					window.location.href = "wordcloud.php";
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
					window.location.href = "wordcloud.php";
					populatePreviousSearches();
				});
			}
		})
	});

</script>
</body>
</html>
