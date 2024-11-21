import React, { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import type { MapLayerMouseEvent } from 'react-map-gl';
import { Location } from '../types/Event';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

interface LocationPickerProps {
    location: Location;
    onLocationChange: (location: Location) => void;
}

interface MapboxResponse {
    features: Array<{
        place_name: string;
    }>;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ location, onLocationChange }) => {
    const [viewport, setViewport] = useState({
        longitude: location.lng || -99.1332,
        latitude: location.lat || 19.4326,
        zoom: 13
    });

    const updateLocation = useCallback(async (lng: number, lat: number) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
            );
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de Mapbox');
            }

            const data: MapboxResponse = await response.json();
            
            if (!data.features || data.features.length === 0) {
                throw new Error('No se encontró dirección para esta ubicación');
            }

            const address = data.features[0].place_name || 'Dirección desconocida';

            onLocationChange({
                lng,
                lat,
                address
            });
        } catch (error) {
            console.error('Error getting address:', error);
            onLocationChange({
                lng,
                lat,
                address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
            });
        }
    }, [onLocationChange]);

    const handleClick = useCallback((event: MapLayerMouseEvent) => {
        const { lng, lat } = event.lngLat;
        updateLocation(lng, lat);
    }, [updateLocation]);

    return (
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <Map
                initialViewState={viewport}
                onMove={evt => setViewport(evt.viewState)}
                mapboxAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={handleClick}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    onGeolocate={(position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        updateLocation(lng, lat);
                    }}
                    style={{ position: 'absolute', top: 10, left: 10 }}
                />
                <NavigationControl position="top-left" />
                {location.lng && location.lat && (
                    <Marker
                        longitude={location.lng}
                        latitude={location.lat}
                        color="blue"
                    />
                )}
            </Map>
        </div>
    );
};

export default LocationPicker;