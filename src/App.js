import React from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';

function App() {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList />
    </div>
  );
}

export default App;
