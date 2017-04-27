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
"take",
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
"uses",
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
var items;

function printResultsForAuthor(authors, index) {
	var pdfURL;

	var count = 0;

	var numResults = 10;

	var request = $.ajax({
		url: "GetNumResults.php",
		type: "GET",
		dataType: "JSON"
	});
	request.done(function(msg) {
		if(msg != ""){
			numResults = msg;
		}
		$.ajax({
			async: false,
		    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+authors[index]+"&hc="+numResults,
		    dataType: "xml",
		    success: function(response) {

		    	var numPapers = response.getElementsByTagName("document").length;
		    	
		    	for (var i = 0; i < numPapers; i++) {
			    	if(typeof response.getElementsByTagName("document")[i] != "undefined"){
			    		if (typeof response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0] != "undefined") {
							text = response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0]["textContent"];
							dict = frequency(text, dict);
						}
					}
				}
				index++;
				if (index < authors.length) {
					printResultsForAuthor(authors, index);
				} else if (index == authors.length) {
					items = Object.keys(dict).map(function(key) {
		    			return [key, dict[key]];
		    		});
		    		items.sort(function(first, second) {
						return second[1] - first[1];
					});
					items = items.slice(0, 250);
					publishtext(items);
				}
			}

		});
	});
}

function conferencesearch(conference, type) {
	//var pdfURL;

	//show_overlay();
	//var count = 0;
	var papers = [];
	$.ajax({
		async: false,
	    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?jn="+conference,
	    // url: "http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7515472",
	    dataType: "xml",
	    success: function(response) {

				for (var i = 0; i < 10; i++) {
		    	if(typeof response.getElementsByTagName("document")[i] != "undefined"){
		    		if (typeof response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0] != "undefined") {
						//text = response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0]["textContent"];
							//if (checkWord(text, targetword)) {
								var tital = response.getElementsByTagName("document")[i].getElementsByTagName("title")[0]["textContent"];
								console.log(tital);
								var crap = [];
								crap[0] = tital;
								paperauthor = response.getElementsByTagName("document")[i].getElementsByTagName("authors")[0]["textContent"];
								//console.log(papers[indx][0]);
								crap[1] = paperauthor;
								//console.log(crap[1]);
								var conference = response.getElementsByTagName("document")[i].getElementsByTagName("pubtitle")[0]["textContent"];
								crap[2] = conference;

								var download = response.getElementsByTagName("document")[i].getElementsByTagName("pdf")[0]["textContent"];
								crap[3] = download;

								if (!papers.includes(crap)) {
									papers.push(crap);
								}
							//}
						}
					}
			///index++;
		}
		if (type === 0) {
			papers.sort(sortFunctionName);
		}
		else if (type === 1) {
			papers.sort(sortFunctionAuth);
		}

				populatetargetlist(papers, conference, true);
			}


	});
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

function findPaper(authors, targetword, index, papers, type) {
	//console.log(authors);
	//var papers = [];

	var numResults = 10;

	var request = $.ajax({
				url: "GetNumResults.php",
				type: "GET",
				dataType: "JSON"
			});
	request.done(function(msg) {
		if(msg != ""){
			numResults = msg;
		}

		$.ajax({
			async: false,
		    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au=" + authors[index]+"&hc="+numResults,
		    // url: "http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7515472",
		    dataType: "xml",
		    success: function(response) {	    	
				var indx = 0;
		    	var numPapers = response.getElementsByTagName("document").length;
		    	for (var i = 0; i < numPapers; i++) {
			    	if(typeof response.getElementsByTagName("document")[i] != "undefined"){
			    		if (typeof response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0] != "undefined") {
							text = response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0]["textContent"];
							var wordcount = checkWord(text, targetword);
								if (wordcount > 0) {
									var tital = response.getElementsByTagName("document")[i].getElementsByTagName("title")[0]["textContent"];
									//console.log(tital);
									var crap = [];
									crap[0] = tital;
									paperauthor = response.getElementsByTagName("document")[i].getElementsByTagName("authors")[0]["textContent"];
									//console.log(papers[indx][0]);
									crap[1] = paperauthor;
									//console.log(crap[1]);
									var conference = response.getElementsByTagName("document")[i].getElementsByTagName("pubtitle")[0]["textContent"];
									crap[2] = conference;

									var download = response.getElementsByTagName("document")[i].getElementsByTagName("pdf")[0]["textContent"];
									crap[3] = download;

									var doi = response.getElementsByTagName("document")[i].getElementsByTagName("doi")[0]["textContent"];
									crap[4] = doi;

									crap[5] = wordcount;
									console.log(tital + "    " + wordcount);


									if (!papers.includes(crap)) {
										papers.push(crap);
										//console.log(papers[0][0]);
									}
									indx++;
								}
						}
					}
				}
				index++;
				if (authors.length > index ) {
					findPaper(authors, targetword, index, papers);
				}
				else {
					//console.log(papers[0][4]);
					if (type === 0) {
						papers.sort(sortFunctionFreq);
					}
					else if (type === 1) {
						papers.sort(sortFunctionName);
					}
					else if (type === 2) {
						papers.sort(sortFunctionAuth);
					}
					else if (type === 3) {
						papers.sort(sortFunctionConf);
					}
					populatetargetlist(papers);
				}

				populatetargetlist(papers, targetword, false);
			}
		});

	});

}

function sortFunctionFreq(a, b) {
    if (a[5] === b[5]) {
        return 0;
    }
    else {
        return (a[5] > b[5]) ? -1 : 1;
    }
}
function sortFunctionName(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function sortFunctionAuth(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
function sortFunctionConf(a, b) {
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function populatetargetlist(papers, word, conference) {

	identifier = document.getElementById("identifier");
	htmltitle= document.getElementById("title");
	if (conference === true) {
		identifier.innerHTML = "Conference: ";
	}
	else {
		identifier.innerHTML = "Word: ";
	}
		htmltitle.innerHTML = word;
	var list = document.getElementById("listitems");
	list.innerHTML = "";
	for (var i = 0; i < papers.length; i++) {
		var tr = document.createElement('tr');

		//create checkbox
		var checkboxtd = document.createElement('td');
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkboxtd.appendChild(checkbox);
		tr.appendChild(checkboxtd);

		//title clickable
		var td1 = document.createElement('td');
		td1.id = papers[i][0];
		var t1 = document.createTextNode(papers[i][0]);
		td1.onclick = function() {
			clickedPaperTitle(this.innerHTML);
		}
		td1.appendChild(t1);
		tr.appendChild(td1);

		var arrayy = papers[i][1].split(";");
		console.log(arrayy);
		var td2 = document.createElement('td');
		for (var j = 0; j < arrayy.length; j++) {
			if (j > 0) {
				var and = document.createTextNode(" ; ");
				var andspan = document.createElement('span');
				andspan.appendChild(and);
				td2.appendChild(andspan);
			}
			var link = document.createTextNode(arrayy[j]);
			var span = document.createElement('span');
			span.onclick = function () {
				//console.log(this);
				newauthor(this.innerHTML);
			}
			span.appendChild(link);
			td2.appendChild(span);
		}
		tr.appendChild(td2);


		var td3 = document.createElement('td');
		var conference = document.createTextNode(papers[i][2]);
		var conferencespan = document.createElement('span');
		conferencespan.appendChild(conference);
		conferencespan.onclick = function() {

			conferencesearch(this.innerHTML, 0);
		}
		td3.appendChild(conferencespan);
		tr.appendChild(td3);
		/*for (var j = 1; j < 3; j++) {
			var td = document.createElement('td');
			var t = document.createTextNode(papers[i][j]);

			td.appendChild(t);
			tr.appendChild(td);
		}*/
		var td = document.createElement('td');
		var a = document.createElement('a');
		var span = document.createElement('span');
		span.className="glyphicon glyphicon-download";
		a.className="icon iconfloat";
		a.href = papers[i][3];
		a.appendChild(span);
		td.appendChild(a);
		tr.appendChild(td);

		var bibtexTD = document.createElement('td');
		var bibtexText = document.createTextNode(papers[i][4]);
		bibtexTD.onclick = function() {

			showBibTeX(this.innerHTML);
		}
		bibtexTD.appendChild(bibtexText);
		tr.appendChild(bibtexTD);

		list.appendChild(tr);
	}

}

function newauthor(authorvalue) {
	var request0 = $.ajax({
		url: "NewSearch.php",
	});
	var request = $.ajax({
		url: "StoreAuthor.php",
		type: "POST",
		data: {author : authorvalue},
		dataType: "text"
	});
	request.done(function(msg) {
		window.location.href = "wordcloud.php";
		populatePreviousSearches();
	});
}

function checkWord(text, targetword) {
	text = text.toLowerCase();
	var arr = text.split(/[().,;!?\[\]\n\s]/g);
	var count = 0;
	console.log(targetword);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === targetword) {

			count++;
		}
	}
	return count;
}

function publishtext(arr) {

	var fontSizes = [ "10px", "20px", "30px", "40px", "50px", "60px", "70px", "80px", "90px", "100px"];

	var big_freq = arr[0][1]; //the number of the biggest frequency goes here

	arr = shuffle(arr);


	for(count = 0; count < arr.length; count++) {//Change this to iterate through the loop

		var freq = arr[count][1]; //frequency of word you working on

		var t = document.createTextNode(arr[count][0] + " "); //creating the text node

		var span = document.createElement('span');//creating a span
		span.id = arr[count][0];


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
		// span.innerHTML = arr[count][0];
		span.onclick = function() {
			var word = this.innerHTML;

			// console.log("Word clicked from Word Cloud Page: " + word);

			var request = $.ajax({
				url: "StoreCurrentWord.php",
				type: "POST",
				data: {word : word},
				dataType: "text"
			});
			request.done(function(msg) {
				console.log(msg);
				window.location.href = "titleListPage.html";
			});

		}
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
        // alert("hello");
        // alert(abstract);

      },
      error: function(xhr, error){
      	// alert(error + xhr);
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

function newItem(title, author) {
		var li = document.createElement("li");
		li.className = "list-group-item";
		var input = document.createElement("input");
		input.type= "checkbox";

		li.appendChild(input);

		var span = document.createElement('span');
		span.value = title;
		span.innerHTML = " " + title + " - " + author;
		span.setAttribute("class", "papertitle link_cursor");
		span.setAttribute("value", title);
		span.style.color = "rgb(47, 121, 185)";
		span.setAttribute("onclick", "clickedPaperTitle(this);");
		li.appendChild(span);

		document.getElementById("list").appendChild(li);

}

function authorsSearchedDocsWith(word){
	$.ajax({
		url:"GetAuthors.php",
		type: "GET",
		dataType:"json",
		success: function (response) {
			console.log(response);

			var numResults = 10;

			var request = $.ajax({
				url: "GetNumResults.php",
				type: "GET",
				dataType: "JSON"
			});
			request.done(function(msg) {
				var i;
				for (i in response) {
					if(response[i] != ""){
						$.ajax({
							url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+response[i]+"&querytext="+word+"&hc="+numResults,
							dataType: "xml",
							success: function (data){
								// console.log(data);

								var numPapers = data.getElementsByTagName("document").length;

								for(var i = 0; i < numPapers; i++){ 
									var title = data.getElementsByTagName("document")[i].getElementsByTagName("title")[0]["textContent"];
									var author = data.getElementsByTagName("document")[i].getElementsByTagName("authors")[0]["textContent"];
									newItem(title, author)
								}
							}
						});
					}
				}
			});
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
					console.log("http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext=("+response[i]+" AND "+word+")");
					$.ajax({
						url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext=("+response[i]+" AND "+word,
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

function showBibTeX(doi) {
  $.ajax({
    url : "http://dx.doi.org/"+doi,
    headers: {
      Accept: "application/x-bibtex; charset=utf-8",
      "Content-Type": "application/x-bibtex; charset=utf-8"
    },
    success : function(result){
    	console.log(result);
    	console.log(typeof result);
        alert(result);
    }
  });
}
