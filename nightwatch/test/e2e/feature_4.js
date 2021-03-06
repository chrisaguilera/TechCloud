var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 4 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('span[id="web"]')
      .click('span[id="web"]')
      .waitForElementVisible('div[class="paperTable"]')
      .waitForElementVisible('a[href="http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6405359"]')
      .click('a[href="http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6405359"]');

    browser
      .assert.urlEquals('http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6405359&tag=1')
      .end();
  }
};
