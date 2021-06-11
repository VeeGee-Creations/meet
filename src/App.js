import React, {Component} from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';
import { extractLocations, getEvents, limitResults } from './api';
import nProgress from 'nprogress';
import './nprogress.css';

nProgress.configure({ showSpinner: false });

export default class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({events, locations: extractLocations(events)});
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  updateNumberOfEvents = (number) => {
    this.setState({
      numberOfEvents: number
    });
  }

  render() {
    const {events, locations, numberOfEvents} = this.state;
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={limitResults(events, numberOfEvents)} />
      </div>
    );
  }
}
