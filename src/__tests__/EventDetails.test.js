import React from 'react';
import {shallow} from 'enzyme';
import EventDetails from '../components/EventDetails/EventDetails';
import mockData from '../mock-data';

describe('<EventDetails component', () => {
    let event, EventDetailsWrapper;
    beforeAll(() => {
        event = mockData[1];
        EventDetailsWrapper = shallow(<EventDetails event={event} />)
    });
    test('renders event details container', () => {
        expect(EventDetailsWrapper.find('.details-container')).toHaveLength(1);
    });
    test('renders event details title', () => {
        expect(EventDetailsWrapper.find('.details-title')).toHaveLength(1);
    });
    test('renders event details link', () => {
        expect(EventDetailsWrapper.find('.details-link')).toHaveLength(1);
    });
    test('renders event details description', () => {
        expect(EventDetailsWrapper.find('.details-description')).toHaveLength(1);
    });
    test('populates event details title correctly', () => {
        expect(EventDetailsWrapper.find('.details-title').text()).toBe('About event:');
    });
    test('populates event details link correctly', () => {
        let link = event.htmlLink;
        expect(EventDetailsWrapper.find('.details-link').prop('href')).toBe(link);
        expect(EventDetailsWrapper.find('.details-link').text()).toBe('See details on Google Calendar');
    });
    test('populates event details description correctly', () => {
        let description = event.description;
        expect(EventDetailsWrapper.find('.details-description').text()).toBe(description);
    });
});