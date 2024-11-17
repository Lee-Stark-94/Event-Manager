import React, { useState } from 'react';
import { Event } from '../types/Event';
import EventList from './EventList';
import EventForm from './EventForm';

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
        <div className="event-manager">
            <h1>Event Manager</h1>
            <EventForm onSubmit={addEvent} />
            <EventList events={events} />
        </div>
    );
};

export default EventManager; 