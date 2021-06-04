Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given the main page is open
When events are loaded
Then events should be displayed with details collapsed

Scenario: User can expand an event to see its details
Given event details are collapsed
When the user clicks on show details button
Then the event should expand to display details

Scenario: User can collapse an event to hide its details
Given event has been expanded
When the user clicks on hide details button
Then the event should collapse to hide details