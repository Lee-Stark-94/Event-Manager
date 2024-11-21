import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/Event';
import { Box } from '@mui/material';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface EventMapProps {
    event: Event;
}

const EventMap: React.FC<EventMapProps> = ({ event }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [event.location.lng, event.location.lat],
            zoom: 14,
            interactive: false
        });

        marker.current = new mapboxgl.Marker({ color: '#1976d2' })
            .setLngLat([event.location.lng, event.location.lat])
            .addTo(map.current);

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [event.location.lng, event.location.lat]);

    return (
        <Box
            ref={mapContainer}
            sx={{
                height: 200,
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden',
                '& .mapboxgl-canvas': {
                    borderRadius: 1,
                },
            }}
        />
    );
};

export default EventMap;