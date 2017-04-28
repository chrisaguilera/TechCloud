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
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .waitForElementVisible('span[id="web"]')
      .click('span[id="web"]')
      .waitForElementVisible('td[id="Automated Checking of Web Application Invocations"]')
      .waitForElementVisible('button[class="btn btn-default txt"]')
      .click('button[class="btn btn-default txt"]')
      .pause(1000)
      // .acceptAlert()
      .click('button[id="exportpdf"]')
      .pause(1000)
      // .acceptAlert()

    browser
      .assert.elementPresent('button[class="btn btn-default txt"]')
      .end();
  }
};
