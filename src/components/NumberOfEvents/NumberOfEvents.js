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

        this.props.updateNumberOfEvents(event.target.value);
    }

    render() {
        const {resultNumber} = this.state;
        return (
            <div className="NumberOfEvents">
                <label># of events:
                <input type="number"
                className="number-events"
                value={resultNumber}
                onChange={this.handleInputChange}
                />
                </label>
            </div>
        );
    }
}