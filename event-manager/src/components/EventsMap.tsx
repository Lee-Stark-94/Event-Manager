import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/Event';
import { Box } from '@mui/material';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface EventsMapProps {
    events: Event[];
}

const EventsMap: React.FC<EventsMapProps> = ({ events }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Inicializar mapa
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-99.1332, 19.4326], // Centro en CDMX por defecto
            zoom: 11
        });

        // Agregar controles de navegación
        map.current.addControl(new mapboxgl.NavigationControl());

        return () => {
            map.current?.remove();
        };
    }, []);

    useEffect(() => {
        if (!map.current || events.length === 0) return;

        // Limpiar marcadores existentes
        const markers = document.getElementsByClassName('mapboxgl-marker');
        while (markers[0]) {
            markers[0].remove();
        }

        // Crear bounds para ajustar el mapa a todos los eventos
        const bounds = new mapboxgl.LngLatBounds();

        // Agregar marcadores para cada evento
        events.forEach((event) => {
            const { lng, lat } = event.location;

            // Crear elemento personalizado para el popup
            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
                <h3 style="margin: 0 0 8px 0; font-size: 16px;">${event.title}</h3>
                <p style="margin: 0 0 5px 0; font-size: 14px;">${event.date.toLocaleDateString()}</p>
                <p style="margin: 0; font-size: 14px;">${event.location.address}</p>
            `;

            // Crear y agregar marcador
            new mapboxgl.Marker({ color: '#1976d2' })
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setDOMContent(popupContent))
                .addTo(map.current!);

            // Extender bounds para incluir este punto
            bounds.extend([lng, lat]);
        });

        // Ajustar el mapa para mostrar todos los marcadores
        if (!bounds.isEmpty()) {
            map.current.fitBounds(bounds, {
                padding: 50,
                maxZoom: 15
            });
        }
    }, [events]);

    return (
        <Box sx={{ height: '500px', width: '100%' }}>
            <Box 
                ref={mapContainer} 
                sx={{ 
                    height: 'calc(100% - 32px)',
                    borderRadius: 1,
                    overflow: 'hidden'
                }} 
            />
        </Box>
    );
};

export default EventsMap;