var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 12 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .waitForElementVisible ('input[id="Automated Checking of Web Application Invocations"]')
      .click ('input[id="Automated Checking of Web Application Invocations"]')
      .click ('input[id="Detecting and Localizing Visual Inconsistencies in Web Applications"]')
      .click ('button[id="generatewordcloud"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]');

    browser
      .assert.title('Automated Checking of Web Application Invocations, Detecting and Localizing Visual Inconsistencies in Web Applications')
      .end();
  }
};
