Feature: Page Traversal
  In order to traverse between pages
  As a website user
  I need to be able to be directed from one page to a new page

  Scenario: Search button clicked on index page
    Given I am on "/index.html"
    When I fill in "search" with "Halfond"
    And I press "searchButton"
    Then I should be on "/wordcloud.html"