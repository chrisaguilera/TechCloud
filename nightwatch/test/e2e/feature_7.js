var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 7 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .setValue('input[id="input-text"]', 'Boehm')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('span[id="systems"]');

    browser
      .assert.title('Boehm')
      .end();
  }
};
