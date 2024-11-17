import React, { useState } from 'react';
import { Event, Location } from '../types/Event';
import LocationPicker from './LocationPicker';

interface EventFormProps {
    onSubmit: (event: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState<Location>({
        lat: 0,
        lng: 0,
        address: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            date: new Date(date),
            location
        });
        // Limpiar el formulario
        setTitle('');
        setDescription('');
        setDate('');
        setLocation({ lat: 0, lng: 0, address: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <div>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="date">Fecha:</label>
                <input
                    type="datetime-local"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ubicación:</label>
                <LocationPicker 
                    location={location}
                    onLocationChange={setLocation}
                />
                {location.address && (
                    <p className="selected-address">
                        Dirección seleccionada: {location.address}
                    </p>
                )}
            </div>
            <button 
                type="submit"
                disabled={!location.lat || !location.lng}
            >
                Crear Evento
            </button>
        </form>
    );
};

export default EventForm;