import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from '../components/EventList/EventList';
import CitySearch from '../components/CitySearch/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents/NumberOfEvents';
import mockData from '../mock-data';
import {extractLocations, getEvents} from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
    test('get list of all events when user slects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
    test('app state numberOfEvents is set by component Number of events', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
        expect(AppNumberOfEventsState).not.toEqual(undefined);
        NumberOfEventsWrapper.instance().handleInputChange({target: {value: 1}});
        expect(AppWrapper.state('numberOfEvents')).toEqual(1);
        AppWrapper.unmount();
    });
    test('EventList passed limited events as prop', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({events: mockData, numberOfEvents: 1});
        const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
        expect(AppNumberOfEventsState).toEqual(1);
        const EventListWrapper = AppWrapper.find(EventList);
        expect(EventListWrapper.props().events).toHaveLength(AppNumberOfEventsState);
        AppWrapper.unmount();
    });
});