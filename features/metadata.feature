Feature: Content Metadata API Test

  Scenario: Verify status code and response time
    Given I send a GET request to "/ibltest"
    Then the status code should be 200
    And the response time should be below 1000 milliseconds

  Scenario: Verify the "id" field and "type" of episodes
    Given I send a GET request to "/ibltest"
    Then all schedule items should have non-empty "id"
    And all schedule items should have "type" as "episode"

  Scenario: Verify the "title" field of episodes
    Given I send a GET request to "/ibltest"
    Then the "title" field in every schedule item should not be empty

  Scenario: Verify only one episode has "live" set to true
    Given I send a GET request to "/ibltest"
    Then only one episode should have the "live" field set to true

  Scenario: Verify transmission dates
    Given I send a GET request to "/ibltest"
    Then the "transmission_start" date should be before the "transmission_end" date

  Scenario: Verify the "Date" value in response headers
    Given I send a GET request to "/ibltest"
    Then the "Date" header should exist

  Scenario: Verify status code and error properties for invalid endpoint
    Given I send a GET request to "/ibltest/2023-09-11" 
    Then the status code should be 404
    And the error object should have properties "details" and "http_response_code"
