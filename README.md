# meet
A serverless, progressive web application (PWA) built with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## FEATURE 1: FILTER EVENTS BY CITY
As a **user**, I should be able to **find events by city** so that **I only get results relevant to me**.

- **Scenario 1**: When user hasn’t searched for a city, show upcoming events from all cities
    - **Given** user hasn’t searched for any city
    - **When** the user opens the app
    - **Then** the user should see a list of all upcoming events
    
- **Scenario 2**: User should see a list of suggestions when they search for a city
    - **Given** the main page is open
    - **When** user starts typing in the city textbox
    - **Then** the user should see a list of cities (suggestions) that match what they’ve typed
    
- **Scenario 3**: User can select a city from the suggested list
    - **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
    - **When** the user selects a city (e.g., “Berlin, Germany”) from the list
    - **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

## FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
As a **user**, I should be able to **show and hide event details** so that **browsing events is fast and simple**.

- **Scenario 1**: An event element is collapsed by default
    - **Given** a city has been selected
    - **When** events are loaded
    - **Then** events should be display with details collapsed
    
- **Scenario 2**: User can expand an event to see its details
    - **Given** events are displayed with events collapsed
    - **When** the user clicks on expand/collapse button
    - **Then** the event should expand to display details
    
- **Scenario 3**: User can collapse an event to hide its details
    - **Given** event has been expanded
    - **When** the user clicks on expand/collapse button
    - **Then** the event should collapse to hide its details

## FEATURE 3: SPECIFY NUMBER OF EVENTS
As a **user**, I should be able to **set the number of results** so that **I can see as many or as few events as I wish**.

- **Scenario 1**: When user hasn’t specified a number, 32 is the default number
    - **Given** a default number of results is not selected
    - **When** events are displayed
    - **Then** a default of 32 events should be displayed
    
- **Scenario 2**: User can change the number of events they want to see

    - **Given** events are displayed
    - **When** the user selects the amount of results they wish displayed
    - **Then** the events should return the amount of results the user selected

## FEATURE 4: USE THE APP WHEN OFFLINE
As a **user**, I should be able to **view events offline** so that **I can see event details even if I lose connection on the way**.

- **Scenario 1**: Show cached data when there’s no internet connection
    - **Given** there is no network connection
    - **When** the user views events
    - **Then** the cached events should be returned
    
- **Scenario 2**: Show error when user changes the settings (city, time range)
    - **Given** cached events are being displayed
    - **When** the user changes the settings (city, time, range)
    - **Then** a connection error should be displayed
 
## FEATURE 5: DATA VISUALIZATION
As a user, I should be able to see how many events are in the area so that I can find the hotspots.

- **Scenario 1**: Show a chart with the number of upcoming events in each city
    - **Given** the user has selected a city
    - **When** events are loaded
    - **Then** display chart with the number of events in cities within range

