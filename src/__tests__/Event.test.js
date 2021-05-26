import React from 'react';
import {shallow} from 'enzyme';
import Event from '../components/Event/Event';
import EventDetails from '../components/EventDetails/EventDetails';
import mockData from '../mock-data'

describe('<Event /> component', () => {
    let event, EventWrapper;
    beforeAll(() => {
        event = mockData[1];
        EventWrapper = shallow(<Event event={event} />);
    });
    test('render event container', () => {
        expect(EventWrapper.find('.Event-container')).toHaveLength(1);
    });
    test('render details container', () => {
        expect(EventWrapper.find('.Event-details-container')).toHaveLength(1);
    });
    test('render event title', () => {
        expect(EventWrapper.find('.Event-title')).toHaveLength(1);
    });
    test('render event time', () => {
        expect(EventWrapper.find('.Event-time')).toHaveLength(1);
    });
    test('render event location', () => {
        expect(EventWrapper.find('.Event-location')).toHaveLength(1);
    });
    test('render details button', () => {
        expect(EventWrapper.find('.details-button')).toHaveLength(1);
    });
    test('populates event title text correctly', () => {
        expect(EventWrapper.find('.Event-title').text()).toBe(event.summary);
    });
    test('populates event time correctly', () => {
        const eventDate = new Date(event.start.dateTime);
        expect(EventWrapper.find('.Event-time').text()).toBe(eventDate.toString());
    });
    test('populates event location correctly', () => {
        expect(EventWrapper.find('.Event-location').text()).toBe(`@${event.summary} | ${event.location}`);
    });
    test('populate details button text from state', () => {
        const buttonText = EventWrapper.state('detailsButton');
        expect(EventWrapper.find('.details-button').text()).toBe(`${buttonText} details`);
    });
    test('show event details on click', () => {
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.details-button').text()).toBe('hide details')
        expect(EventWrapper.find(EventDetails)).toHaveLength(1);
        expect(EventWrapper.find(EventDetails).prop('event')).toBe(event);
    })
    test('hide event details on click', () => {
        EventWrapper.setState({detailsButton: 'hide'});
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.details-button').text()).toBe('show details')
        expect(EventWrapper.find(EventDetails)).toHaveLength(0);
    })
});