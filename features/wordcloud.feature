Feature: Word Cloud
  Generate a word cloud
  For a search given by user
  I need to generate text on the page

  Scenario: Load page
    Given I am on "/wordcloud.html"
    Then I should have words on screen
