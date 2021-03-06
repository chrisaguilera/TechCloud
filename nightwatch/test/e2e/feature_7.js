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
      .waitForElementVisible('span[id="web"]')
      .click('span[id="web"]')
      .waitForElementVisible('span[id="Sonal Mahajan"]')
      .click('span[id="Sonal Mahajan"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]');

    browser
      .assert.title('Sonal Mahajan')
      .end();
  }
};
