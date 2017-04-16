
function printResultsForAuthor(author){
	var pdfURL;
	$.ajax({
	    url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?au="+author,
	    // url: "http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7515472",
	    dataType: "xml",
	    success: function( response ) {
	      // console.log( response ); // server response
		  text = response.getElementsByTagName("document")[0].getElementsByTagName("abstract")[0]["textContent"];
		  /*console.log(pdfURL);
		  $.ajax({
		  	url: pdfURL,
		  	dataType: "xml",
		  	success: function(pdf){
		  		console.log(pdf);
		  	}
		  });*/
			publishtext(text);

	    }
  	});
}

function publishtext(text) {
	var span  = document.createElement('span');
	span.appendChild(text);
	document.getElementById("wordcloudparagraph").appendChild(span);
}
