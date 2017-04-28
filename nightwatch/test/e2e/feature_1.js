var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 1 Test': function (browser) {
    browser
      .url('http://localhost:8880/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]');

    browser
      .assert.title('Halfond')
      .end();
  }
};
