  var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 5 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .waitForElementVisible ('td[id="10.1109/ISSRE.2012.37"]')
      .click ('td[id="10.1109/ISSRE.2012.37"]');

    browser
      .assert.title('List of Papers')
      .end();
  }
};
