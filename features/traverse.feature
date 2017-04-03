Feature: Page Traversal
  In order to traverse between pages
  As a website user
  I need to be able to be directed from one page to a new page

  Scenario: Search button clicked on index page
    Given I am on "/index.html"
    When I fill in "search" with "Halfond"
    And I press "searchButton"
    Then I should be on "/wordcloud.html"

  Scenario: Word clicked on word cloud page
    Given I am on "/wordcloud.html"
    When I follow "link"
    Then I should be on "/titleListPage.html"

  Scenario: Paper title clicked on paper title list page
    Given I am on "/titleListPage.html"
    When I follow "link"
    Then I should be on "/abstractPage.html"