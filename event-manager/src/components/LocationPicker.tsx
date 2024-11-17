import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '../types/Event';

// Reemplaza con tu token de Mapbox
mapboxgl.accessToken = 'TU_MAPBOX_TOKEN';

interface LocationPickerProps {
    location: Location;
    onLocationChange: (location: Location) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ location, onLocationChange }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Inicializar mapa
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location.lng || -99.1332, location.lat || 19.4326], // Default: CDMX
            zoom: 13
        });

        // Añadir controles de navegación
        map.current.addControl(new mapboxgl.NavigationControl());

        // Crear marcador
        marker.current = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([location.lng || -99.1332, location.lat || 19.4326])
        .addTo(map.current);

        // Evento de clic en el mapa
        map.current.on('click', async (e) => {
            const { lng, lat } = e.lngLat;
            marker.current?.setLngLat([lng, lat]);
            updateLocation(lng, lat);
        });

        // Evento de arrastre del marcador
        marker.current.on('dragend', () => {
            const lngLat = marker.current?.getLngLat();
            if (lngLat) {
                updateLocation(lngLat.lng, lngLat.lat);
            }
        });

        return () => {
            map.current?.remove();
        };
    }, []);

    const updateLocation = async (lng: number, lat: number) => {
        try {
            // Obtener dirección usando la API de Geocoding de Mapbox
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            const address = data.features[0]?.place_name || 'Dirección desconocida';

            onLocationChange({
                lng,
                lat,
                address
            });
        } catch (error) {
            console.error('Error getting address:', error);
        }
    };

    return (
        <div>
            <div ref={mapContainer} style={{ height: '300px', width: '100%' }} />
        </div>
    );
};

export default LocationPicker; 