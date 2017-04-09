Feature: Get List
  When click on a word
  Get the list of the articles with that word

  Scenario: Click on word in word cloud
    Given I am on "/wordcloud.html"
    When I click on a word
    Then I should be on "/titleListPage.html"
    And list should be populated
