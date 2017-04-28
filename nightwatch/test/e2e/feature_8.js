var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 8 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .click ('span[id="2012 IEEE 23rd International Symposium on Software Reliability Engineering"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .attributeEquals ("2015 IEEE 8th International Conference on Software Testing, Verification and Validation (ICST)");

    browser
      .assert.title('List of Papers')
      .end();
  }
};
