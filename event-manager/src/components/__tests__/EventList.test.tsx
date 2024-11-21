import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from '../EventList';

describe('EventList', () => {
    const events = [
        { id: '1', title: 'Evento 1', description: 'Descripción 1', date: new Date(), location: { lat: 0, lng: 0, address: 'Ubicación 1' } },
        { id: '2', title: 'Evento 2', description: 'Descripción 2', date: new Date(), location: { lat: 0, lng: 0, address: 'Ubicación 2' } },
    ];

    test('renders event list', () => {
        render(<EventList events={events} />);

        expect(screen.getByText(/evento 1/i)).toBeInTheDocument();
        expect(screen.getByText(/evento 2/i)).toBeInTheDocument();
    });

    test('displays message when no events are present', () => {
        render(<EventList events={[]} />);

        expect(screen.getByText(/no hay eventos programados/i)).toBeInTheDocument();
    });
}); 