var stop_words = [
"",
"a",
"also",
"about",
"above",
"after",
"again",
"against",
"all",
"am",
"an",
"and",
"any",
"are",
"aren't",
"as",
"at",
"be",
"because",
"been",
"before",
"being",
"below",
"between",
"both",
"but",
"by",
"can",
"can't",
"cannot",
"could",
"couldn't",
"did",
"didn't",
"do",
"does",
"doesn't",
"doing",
"don't",
"down",
"due",
"during",
"each",
"few",
"for",
"from",
"further",
"had",
"hadn't",
"has",
"hasn't",
"have",
"haven't",
"having",
"he",
"he'd",
"he'll",
"he's",
"her",
"here",
"here's",
"hers",
"herself",
"him",
"himself",
"his",
"how",
"how's",
"i",
"i'd",
"i'll",
"i'm",
"i've",
"if",
"in",
"into",
"is",
"isn't",
"it",
"it's",
"its",
"itself",
"let's",
"made",
"me",
"more",
"most",
"mustn't",
"my",
"myself",
"no",
"nor",
"not",
"of",
"off",
"on",
"once",
"only",
"or",
"other",
"ought",
"our",
"ours",
"ourselves",
"out",
"over",
"own",
"same",
"shan't",
"she",
"she'd",
"she'll",
"she's",
"should",
"shouldn't",
"so",
"some",
"such",
"than",
"that",
"that's",
"the",
"their",
"theirs",
"them",
"themselves",
"then",
"there",
"there's",
"these",
"they",
"they'd",
"they'll",
"they're",
"they've",
"this",
"those",
"through",
"to",
"too",
"under",
"until",
"up",
"use",
"using",
"very",
"via",
"was",
"wasn't",
"will",
"won't",
"wont",
"we",
"we'd",
"we'll",
"we're",
"we've",
"were",
"weren't",
"what",
"what's",
"when",
"when's",
"where",
"where's",
"which",
"while",
"who",
"who's",
"whom",
"why",
"why's",
"with",
"won't",
"would",
"wouldn't",
"you",
"you'd",
"you'll",
"you're",
"you've",
"your",
"yours",
"yourself",
"yourselves"];

var dict  = {};

function printResultsForAuthor(authors, index) {
	var pdfURL;
	var items;
	//show_overlay();
	var count = 0;
	$.ajax({
		async: false,
	    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+authors[index],
	    // url: "http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7515472",
	    dataType: "xml",
	    success: function(response) {

	    	for (var i = 0; i < 5; i++) {
	    		if (typeof response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0] != "undefined") {
					text = response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0]["textContent"];
					dict = frequency(text, dict);
				}
			}

			items = Object.keys(dict).map(function(key) {
		    	return [key, dict[key]];
		    });

		    index++;
		    if (index < authors.length) {
		    	printResultsForAuthor(authors, index);
		    }
		}
	});

	if (index == authors.length) {
		items.sort(function(first, second) {
			return second[1] - first[1];
		});
		items = items.slice(0, 250);

		publishtext(items);
	}
}

function frequency (text, dict) {
	text = text.toLowerCase();
	var arr = text.split(/[().,;!?\[\]\n\s]/g);
	for (var i = 0; i < arr.length; i++) {
		var stop = false;
	    for (j = 0; j < stop_words.length; j++) {
	   		if (arr[i] === stop_words[j]) {
	    		stop = true;
	    		break;
	    	}
	    }
	    if (!stop) {
	    	if (!(arr[i] in dict)) {
			dict[arr[i]] = 1;
			} else {
				dict[arr[i]]++;
			}
	   	}
	}
	return dict;
}

function publishtext(arr) {

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

function getAbstractForDocTitle(title){ // we don't need this, its here just for reference. Can delete it.
    $.ajax({
      url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?ti="+title,
      dataType: "xml",
      success: function( response ) {
        abstract = response.getElementsByTagName("document")[0].getElementsByTagName("abstract")[0]["textContent"];
        alert("hello");
        alert(abstract);

      },
      error: function(xhr, error){
      	alert(error + xhr);
      }
    });
}

// function getListOfTitlesForAuthor(author){ // we don't need this, its here just for reference. Can delete it.
//     $.ajax({
//       url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+author,
//       dataType: "xml",
//       success: function( response ) {
//       	for(var i = 0; i < 5; i++){
//       		abstract = response.getElementsByTagName("document")[i].getElementsByTagName("title")[0]["textContent"];
//         	console.log(abstract);
//       	}

//       }
//     });
// }

function authorsSearchedDocsWith(word){
	$.ajax({
		url:"GetAuthors.php",
		type: "GET",
		dataType:"json",
		success: function (response) {
			console.log(response);
			var i;
			for (i in response) {
				if(response[i] != ""){
					console.log("http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+response[i]+"&querytext="+word);
					$.ajax({
						url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+response[i]+"&querytext="+word,
						dataType: "xml",
						success: function (data){
							console.log(data);
						}
					});
				}
			}
		}
	});
}

function keyTermsSearchedDocsWith(word){
	$.ajax({
		url:"GetKeywords.php",
		type: "GET",
		dataType:"json",
		success: function (response1) {
			console.log(response1);
			var response = ["prevention", "localization and search"];
			var i;
			for (i in response) {
				if(response[i] != ""){
					console.log("http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext="+response[i]+" AND "+word);
					$.ajax({
						url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext="+response[i]+" AND "+word,
						dataType: "xml",
						success: function (data){
							console.log(data);
						}
					});
				}
			}
		}
	});
}

