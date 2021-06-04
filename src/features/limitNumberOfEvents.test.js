import{ loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/limitNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = mount(<App />);
    });

    afterAll(() => {
        AppWrapper.unmount();
    });

    test('When user hasn\'t specified a limit, 32 is the default limit', ({ given, when, then }) => {
        given('the user has not selected a number of events', () => {

        });

        when('events are displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event-container')).toHaveLength(mockData.length);
        });

        then('a default limit of 32 events should be set', () => {
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });
    });

    test('User can change the limit of events displayed', ({ given, when, then }) => {
        given('events are displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event-container')).toHaveLength(mockData.length);
        });

        when('the user changes the event limit', () => {
            AppWrapper.find('.number-events').simulate('change', { target: { value: 1 } });
            expect(AppWrapper.state('numberOfEvents')).toEqual(1);
        });

        then('events should not display more than the new limit', () => {  
            expect(AppWrapper.find('.Event-container')).toHaveLength(1);
        });
    });
});