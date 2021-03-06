var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 11 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .setValue('input[id="input-text"]', 'Boehm')
      .click('input[id="nameRadio"]')
      .click('button[type="add"]')
      .waitForElementVisible('span[id="web"]');

    browser
      .assert.elementPresent('option[value="Halfond"]')
      .assert.elementPresent('option[value="Boehm"]')
      .end();
  }
};
