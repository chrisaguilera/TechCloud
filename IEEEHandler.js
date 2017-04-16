
function printResultsForAuthor(author){
	var pdfURL;
	$.ajax({
	    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+author,
	    // url: "http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7515472",
	    dataType: "xml",
	    success: function( response ) {
	      // console.log( response ); // server response
		  //response.get
		  var dict = {};
		  for (var i = 0; i < 5; i++) {
			text = response.getElementsByTagName("document")[i].getElementsByTagName("abstract")[0]["textContent"];

			dict = frequency(text, dict);
		  }
		  var items = Object.keys(dict).map(function(key) {
		    return [key, dict[key]];
		  });
		  items.sort(function(first, second) {
		    return second[1] - first[1];
     	  });
	    
		  publishtext(items);

	    }
  	});
}

function frequency (text, dict) {
	var arr = text.split(/[().,;!?\[\]\n\s]/g);
	for (var i = 0; i < arr.length; i++) {

		if (!(arr[i] in dict)) {
			dict[arr[i]] = 1;
		} else {
			dict[arr[i]]++;

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

function getAbstractForDocTitle(title){
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

