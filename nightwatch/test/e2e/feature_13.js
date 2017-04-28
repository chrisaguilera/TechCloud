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
      .waitForElementVisible ('button[id="download"]')
      // .click('button[id="download"]')
      .saveScreenshot('/Users/chrisaguilera/Desktop/WordCloud.png');

    browser
      .assert.title('Halfond')
      .end();
  }
};
