$(document).ready(function () {

    QUnit.test( "Test getAbstractForDocTitle()", function( assert ) {
          assert.expect(1);
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

      var input = "Detecting and Localizing Internationalization Presentation Failures in Web Applications"
      getAbstractForDocTitle(input);

      var done = assert.async();
          setTimeout(function(){
            assert.deepEqual(abstract, correctAbstract);
            console.log("after timeout: " + abstract);
            done();
          }, 4000);

    });

    QUnit.test( "Test Getting papers for keywords", function( assert ) {
          assert.expect(1);
          var correctAbstract = "Web applications can be easily made available to an international audience by leveraging frameworks and tools for automatic translation and localization. However, these automated changes can distort the appearance of web applications since it is challenging for developers to design their websites to accommodate the expansion and contraction of text after it is translated to another language. Existing web testing techniques do not support developers in checking for these types of problems and manually checking every page in every language can be a labor intensive and error prone task. To address this problem, we introduce an automated technique for detecting when a web page's appearance has been distorted due to internationalization efforts and identifying the HTML elements or text responsible for the observed problem. In evaluation, our approach was able to detect internationalization problems in a set of 54 web applications with high precision and recall and was able to accurately identify the underlying elements in the web pages that led to the observed problem."
          var abstract;
          // function callback(returnVal) {
          //   abstract = returnVal;
          // }

          function getPapersForWords(search){
          $.ajax({
            url: "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext="+search,
            dataType: "xml",
            success: function( response ) {
              abstract = response.getElementsByTagName("document")[0].getElementsByTagName("abstract")[0]["textContent"];
              console.log(abstract);
            }
          });
        }

          var input = "Detecting and Localizing Internationalization Presentation Failures in Web Applications";
          getPapersForWords(input);

          var done = assert.async();
          setTimeout(function(){
            assert.deepEqual(abstract, correctAbstract);
            console.log("after timeout: " + abstract);
            done();
          }, 4000);
          // assert.deepEqual(abstract, correctAbstract);
        });

      });
