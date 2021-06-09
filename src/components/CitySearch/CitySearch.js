import React, { Component } from 'react';
import { InfoAlert } from '../Alert/Alert';

export default class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
        infoText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        console.log(suggestions.length);
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                suggestions,
                infoText: 'We can not find the city you are looking for. Please try another city',
            });
        } else {
            this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        const {query, suggestions, showSuggestions} = this.state;
        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
                <div className="SearchContainer">
                <label>Cities:
                <input type="text"
                className="city"
                value={query}
                placeholder="Search for city"
                onChange={this.handleInputChanged}
                onFocus={() => {this.setState({showSuggestions: true})}}
                />
                </label>

                <ul className="suggestions" style={showSuggestions ? {}: {display: 'none'}}>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all' onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
                </div>
            </div>
        );
    }
}