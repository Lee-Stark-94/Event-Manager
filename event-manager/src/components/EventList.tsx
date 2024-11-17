import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/Event';

interface EventListProps {
    events: Event[];
}

const EventMap: React.FC<{ event: Event }> = ({ event }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [event.location.lng, event.location.lat],
            zoom: 14
        });

        new mapboxgl.Marker()
            .setLngLat([event.location.lng, event.location.lat])
            .addTo(map.current);

        return () => {
            map.current?.remove();
        };
    }, [event]);

    return <div ref={mapContainer} style={{ height: '200px', width: '100%' }} />;
};

const EventList: React.FC<EventListProps> = ({ events }) => {
    return (
        <div className="event-list">
            <h2>Eventos Programados</h2>
            {events.length === 0 ? (
                <p>No hay eventos programados</p>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>
                                <strong>Fecha:</strong>{' '}
                                {event.date.toLocaleDateString()}
                            </p>
                            <EventMap event={event} />
                            <p>
                                <strong>Dirección:</strong> {event.location.address}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;