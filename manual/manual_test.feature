Feature: Validate Date Range and Remaining Time in API Response

  Scenario: Verify that the "remaining" availability text matches the difference between the "start" and "end" dates
    Given the API always returns an "availability" object with a "start" date and an "end" date
      And the "availability" object includes a "remaining" object with a "text" field indicating the availability period
    When I calculate the difference between the "start" and "end" dates
    Then the difference should match the duration indicated in the "remaining" text

Feature: Validate Time Zone Handling for First Broadcast in API Response

  Scenario: Verify that "first_broadcast" time is correctly adjusted for GMT+1 during daylight saving time
    Given the API returns an episode with a "first_broadcast_date_time" of "2023-09-11T05:00:00.000Z"
      And the episode is broadcast during the daylight saving period (GMT+1)
    When I check the "first_broadcast" field in the API response
    Then the "first_broadcast" should correctly display the time adjusted for GMT+1
      And it should show "6am 11 Sep 2023"

Feature: Validate Live Status for TV Episodes in API Response

  Scenario: Verify that "live" is set to true for "Morning Live" episodes
    Given the API returns a TV episode with the title "Morning Live"
    When I check the "live" field in the episode object
    Then the "live" field should be true