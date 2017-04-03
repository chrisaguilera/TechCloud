Feature: Search
  In order to see a word cloud
  As a website user
  I need to be able to search for a word and be directed to the wordcloud page

  Scenario: Searching for any word
    Given I am on "/index.html"
    When I fill in "search" with "Behavior Driven Development"
    And I press "searchButton"
    Then I should be on "/wordcloud.html"