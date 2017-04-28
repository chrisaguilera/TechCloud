var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 9 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .click ('td[id="Automated Checking of Web Application Invocations"]')
      .waitForElementVisible ('div[class="content"]');


    browser
      .assert.title('Abstract Page')
      .end();
  }
};
