import{ loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import mockData from '../mock-data';
import Event from '../components/Event/Event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />)
        });
        
        when('events are loaded', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event-container')).toHaveLength(mockData.length);
            AppWrapper.unmount()
        });
        
        let EventWrapper;
        then('events should be displayed with details collapsed', () => {    
            let event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
            expect(EventWrapper.exists('.details-container')).toBe(false);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let EventWrapper;
        given('event details are collapsed', () => {
            let event = mockData[0];
            EventWrapper = mount(<Event event={event} />);
            expect(EventWrapper.exists('.details-container')).toBe(false);
        });
        
        when('the user clicks on show details button', () => {
            EventWrapper.find('.details-button').simulate('click');
        });
        
        then('the event should expand to display details', () => {
            expect(EventWrapper.exists('.details-container')).toBe(true);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let EventWrapper;
        given('event has been expanded', () => {
            let event = mockData[0];
            EventWrapper = mount(<Event event={event} />);
            EventWrapper.find('.details-button').simulate('click');
            expect(EventWrapper.exists('.details-container')).toBe(true);
        });
        
        when('the user clicks on hide details button', () => {
            EventWrapper.find('.details-button').simulate('click');
        });
        
        then('the event should collapse to hide details', () => {
            expect(EventWrapper.exists('.details-container')).toBe(false);
        });
    });
});