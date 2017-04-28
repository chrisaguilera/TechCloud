var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 6 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('div[id="myBar"]');

    browser
      .assert.elementPresent('div[id="myBar"]')
      .end();
  }
};
