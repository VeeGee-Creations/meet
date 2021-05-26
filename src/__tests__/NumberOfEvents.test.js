import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents/NumberOfEvents';
import mockData from '../mock-data';
import {limitResults} from '../api';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });
    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.number-events')).toHaveLength(1);
    });
    test('read number input correctly', () => {
        const resultNumber = NumberOfEventsWrapper.state('resultNumber');
        expect(NumberOfEventsWrapper.find('.number-events').prop('value')).toBe(resultNumber);
    });
    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            resultNumber: 32
        });
        const eventObject = {target: {value: 4}};
        NumberOfEventsWrapper.find('.number-events').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('resultNumber')).toEqual(4);
    });
    test('results not greater than default number input', () => {
        NumberOfEventsWrapper.setState({
            resultNumber: 32
        });
        const events = mockData;
        const resultNumber = NumberOfEventsWrapper.state('resultNumber');
        expect(limitResults(events, resultNumber).length).toBeLessThanOrEqual(resultNumber);
    });
    test('results not greater than number input', () => {
        NumberOfEventsWrapper.setState({
            resultNumber: 32
        });
        const events = mockData;
        const eventObject = {target: {value: 1}};
        NumberOfEventsWrapper.find('.number-events').simulate('change', eventObject);
        const resultNumber = NumberOfEventsWrapper.state('resultNumber');
        expect(limitResults(events, resultNumber).length).toEqual(1);
        expect(events).toHaveLength(2);
    });
});