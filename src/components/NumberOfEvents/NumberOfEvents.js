import React, {Component} from 'react';

export default class NumberOfEvents extends Component {
    state = {
        resultNumber: 32,
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            resultNumber: value
        });
    }

    render() {
        const {resultNumber} = this.state;
        return (
            <div className="NumberOfEvents">
                <input type="number"
                className="number-events"
                value={resultNumber}
                onChange={this.handleInputChange}
                />
            </div>
        );
    }
}