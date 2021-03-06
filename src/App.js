import React, {Component} from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';
import { extractLocations, getEvents, limitResults, checkToken, getAccessToken } from './api';
import './nprogress.css';
import WelcomeScreen from './components/WelcomScreen/WelcomScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './components/EventGenre/EventGenre';

export default class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: false
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({events, locations: extractLocations(events)});
        }
      });
    }
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const  city = location.split(', ').shift();
      return {city, number};
    })
    return data;
  }

  render() {
    const {events, locations, numberOfEvents, showWelcomeScreen} = this.state;

    return showWelcomeScreen === true ? (
      <div className="App">
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => getAccessToken()} />
      </div>
    ) : (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
            <ResponsiveContainer height={400}>
                <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}} >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="city" />
                    <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={this.getData()} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
        <EventList events={limitResults(events, numberOfEvents)} />
      </div>
    );
  }
}
