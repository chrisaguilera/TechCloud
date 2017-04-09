$(document).ready(function () {

	 QUnit.test("Test myFunction()", function( assert ) {
    function runTest(input, expected) {
      assert.expect( 3 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      myFunction(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.deepEqual( output, expected);
        done();
      }, timeout);
    }

		QUnit.test("Test Populate()", function( assert ) {
     function runTest(input, expected) {
       assert.expect( 3 );
       var done = assert.async();
       var output;
       function callback(returnVal) {
         output = returnVal;
       }
       myFunction(input, callback);
       setTimeout(function(){
         console.log(output);
         assert.deepEqual( output, expected);
         done();
       }, timeout);
     }
    //runTest("jus", ["Justin Bieber","Justin Timberlake","Justin Moore","Justin Quiles","Justice","Justine Skye","Justin Nozuka","Justice Crew","Justin Hurwitz"]);


  });
