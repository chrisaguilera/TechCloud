var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Feature 8 Test': function (browser) {
    browser
      .url('http://localhost:8888/index.php')
      .waitForElementVisible('body')
      .setValue('input[id="input-text"]', 'Halfond')
      .click('input[id="nameRadio"]')
      .click('button[type="search"]')
      .waitForElementVisible('p[id="wordcloudparagraph"]')
      .click('span[id="web"]')
      .waitForElementVisible ('div[class="paperTable"]')
      .waitForElementVisible ('span[id="2012 IEEE 23rd International Symposium on Software Reliability Engineering"]')
      .click ('span[id="2012 IEEE 23rd International Symposium on Software Reliability Engineering"]')
      .waitForElementVisible ('div[class="paperTable"]')

    browser
      .assert.title('List of Papers')
      .assert.elementPresent ('td[id="Automated Checking of Web Application Invocations"]')
      .assert.elementPresent ('td[id="Data Loss Prevention Based on Data-Driven Usage Control"]')
      .assert.elementPresent ('td[id="Dynamic Analysis of Upgrades in C/C++ Software"]')
      .assert.elementPresent ('td[id="Improving Coverage-Based Localization of Multiple Faults Using Algorithms from Integer Linear Programming"]')
      .assert.elementPresent ('td[id="Lightweight Automated Testing with Adaptation-Based Programming"]')
      .assert.elementPresent ('td[id="MoTiP 2012 Workshop Organizers"]')
      .assert.elementPresent ('td[id="Software Life-Extension: A New Countermeasure to Software Aging"]')
      .assert.elementPresent ('td[id="Speculative Symbolic Execution"]')
      .assert.elementPresent ('td[id="Using Multiclass Machine Learning Methods to Classify Malicious Behaviors Aimed at Web Systems"]')
      .assert.elementPresent ('td[id="What Is System Hang and How to Handle It"]')
      .end();
  }
};
