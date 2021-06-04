Feature: Limit number of events

Scenario: When user hasn't specified a limit, 32 is the default limit
Given the user has not selected a number of events
When events are displayed
Then a default limit of 32 events should be set

Scenario: User can change the limit of events displayed
Given events are displayed
When the user changes the event limit
Then events should not display more than the new limit