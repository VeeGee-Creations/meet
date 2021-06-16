import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const EventGerne = ({ events }) => {
    const [data, setData] = useState([])

    useEffect(() => { setData(() => getData());}, [events]);

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map(genre => {
            const value = events.filter(({summary}) => summary.split(' ').includes(genre)).length;
            return { name: genre, value };
        });
        return data;
    }

    const colors = ['#3a83b6', '#947fcf', '#ed6eb4', '#ff746e', '#ffa600'];

    return (
        <ResponsiveContainer height={400}>
            <PieChart>
                <Pie
                    data={data}
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGerne;