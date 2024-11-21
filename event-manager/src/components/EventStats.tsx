import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { Event } from '../types/Event';
import { Data, Layout } from 'plotly.js';

interface EventStatsProps {
    events: Event[];
}

const EventStats: React.FC<EventStatsProps> = ({ events }) => {
    const { data, layout } = useMemo(() => {
        const eventsByMonth = events.reduce((acc, event) => {
            const month = event.date.getMonth();
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);

        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const data: Data[] = [{
            x: Object.keys(eventsByMonth).map(month => months[parseInt(month)]),
            y: Object.values(eventsByMonth),
            type: 'bar',
            marker: { color: '#1976d2' }
        }];

        const layout: Partial<Layout> = {
            title: 'Eventos por Mes',
            xaxis: { 
                title: 'Mes',
                tickangle: -45
            },
            yaxis: { 
                title: 'Número de Eventos',
                tickformat: 'd'
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { family: 'Roboto' },
            margin: { t: 50, b: 80 }
        };

        return { data, layout };
    }, [events]);

    return (
        <Plot
            data={data}
            layout={layout}
            style={{ width: '100%', height: '400px' }}
            config={{ 
                responsive: true,
                displayModeBar: false
            }}
        />
    );
};

export default EventStats;