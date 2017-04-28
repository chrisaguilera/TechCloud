var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 14 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'parallel computing')
      .click('input[id="keywordRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')

    browser
      .assert.elementPresent ('p[id="wordcloudparagraph"]')
      .end();
  }
};
