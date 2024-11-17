import React, { useState } from 'react';
import { Event } from '../types/Event';
import EventList from './EventList';
import EventForm from './EventForm';
import { Box, Container } from '@mui/material';

const EventManager: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (newEvent: Omit<Event, 'id'>) => {
        const event: Event = {
            ...newEvent,
            id: Date.now().toString(),
        };
        setEvents([...events, event]);
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="lg">
                <EventForm onSubmit={addEvent} />
                <EventList events={events} />
            </Container>
        </Box>
    );
};

export default EventManager;