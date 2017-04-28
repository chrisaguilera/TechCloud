var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 13 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .waitForElementVisible ('button[type="search"]')
      .click('button[type="search"]')
      .waitForElementVisible('span[id="web"]')
      .click('span[id="web"]')
      .waitForElementVisible('td[id="Automated Checking of Web Application Invocations"]')
      .click('td[id="Automated Checking of Web Application Invocations"]')
      .waitForElementVisible('h4[id="abstractContent"]')
      .saveScreenshot('/Users/chrisaguilera/Desktop/Abstract.png');

    browser
      .assert.title('Abstract: Automated Checking of Web Application Invocations')
      .end();
  }
};
