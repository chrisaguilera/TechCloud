var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 4 Test': function (browser) {
    browser
      .url('http://localhost:8880/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible('div[class="paperTable"]')
      .click('a[href="http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6405359"]');

    browser
      .assert.title('IEEE Xplore Full-Text PDF:')
      .end();
  }
};
