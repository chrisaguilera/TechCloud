$(document).ready(function () {

	 // QUnit.test("Test myFunction()", function( assert ) {
  //   function runTest(input, expected) {
  //     assert.expect( 3 );
  //     var done = assert.async();
  //     var output;
  //     function callback(returnVal) {
  //       output = returnVal;
  //     }
  //     myFunction(input, callback);
  //     setTimeout(function(){
  //       console.log(output);
  //       assert.deepEqual( output, expected);
  //       done();
  //     }, timeout);
  //   }

		// QUnit.test("Test Populate()", function( assert ) {
  //    function runTest(input, expected) {
  //      assert.expect( 3 );
  //      var done = assert.async();
  //      var output;
  //      function callback(returnVal) {
  //        output = returnVal;
  //      }
  //      myFunction(input, callback);
  //      setTimeout(function(){
  //        console.log(output);
  //        assert.deepEqual( output, expected);
  //        done();
  //      }, timeout);
  //    }

		//  QUnit.test("Test List_Docs()", function( assert ) {
  //     function runTest(input, expected) {
  //       assert.expect( 3 );
  //       var done = assert.async();
  //       var output;
  //       function callback(returnVal) {
  //         output = returnVal;
  //       }
  //       myFunction(input, callback);
  //       setTimeout(function(){
  //         console.log(output);
  //         assert.deepEqual( output, expected);
  //         done();
  //       }, timeout);
  //     }
    //runTest("jus", ["Justin Bieber","Justin Timberlake","Justin Moore","Justin Quiles","Justice","Justine Skye","Justin Nozuka","Justice Crew","Justin Hurwitz"]);

    QUnit.test( "Test getAbstractForDocTitle()", function( assert ) {
      var correctAbstract = "Web applications can be easily made available to an international audience by leveraging frameworks and tools for automatic translation and localization. However, these automated changes can distort the appearance of web applications since it is challenging for developers to design their websites to accommodate the expansion and contraction of text after it is translated to another language. Existing web testing techniques do not support developers in checking for these types of problems and manually checking every page in every language can be a labor intensive and error prone task. To address this problem, we introduce an automated technique for detecting when a web page's appearance has been distorted due to internationalization efforts and identifying the HTML elements or text responsible for the observed problem. In evaluation, our approach was able to detect internationalization problems in a set of 54 web applications with high precision and recall and was able to accurately identify the underlying elements in the web pages that led to the observed problem."
      var abstract;
      function getAbstractForDocTitle(title){
        $.ajax({
          url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?ti="+title,
          dataType: "xml",
          success: function( response ) {
            abstract = response.getElementsByTagName("document")[0].getElementsByTagName("abstract")[0]["textContent"];
            console.log(abstract);
          }
        });
        
      }

      getAbstractForDocTitle("Detecting and Localizing Internationalization Presentation Failures in Web Applications");
      assert.ok(abstract == correctAbstract, "Passed!");

    });

  });
