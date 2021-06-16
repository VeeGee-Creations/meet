import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class Scatter_Chart extends PureComponent {
    render() {
        return (
        <div>
            {console.log(this.props.data)}
            <h4>Events in each city</h4>

            <ResponsiveContainer height={400}>
                <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}} >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="city" />
                    <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={this.props.data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
        );
    }
}