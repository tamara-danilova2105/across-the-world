import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import styles from './AdminMap.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapMarker } from '@/entities/Tours/model/types/types'; //TODO

interface AdminMapProps {
    markers?: MapMarker[];
    onChange: (markers?: MapMarker[]) => void;
}

export const AdminMap = (props: AdminMapProps) => {
    const { markers, onChange } = props;

    const [locations, setLocations] = useState<MapMarker[]>(markers ?? []);

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const handleMapClick = (event: any) => {
        const { lng, lat } = event.lngLat;
        const newId = `location-${Date.now()}`;
        if (!locations.some(location => location.id === newId)) {
            const newLocations = [
                ...locations,
                {
                    id: newId,
                    coordinates: [lng, lat],
                }
            ];
            setLocations(newLocations);
            onChange?.(newLocations);
        }
    };

    const removeLocation = (id: string) => {
        const newLocations = locations.filter((location) => location.id !== id);
        setLocations(newLocations);
        onChange?.(newLocations);
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Map
                mapboxAccessToken={accessToken}
                initialViewState={{
                    longitude: -64.5,
                    latitude: -40,
                    zoom: 4,
                }}
                style={{ width: '100%', height: '80%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={handleMapClick}
            >
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        longitude={location.coordinates[0]}
                        latitude={location.coordinates[1]}
                        anchor="bottom"
                    >
                        <div
                            className={styles.marker}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeLocation(location.id)
                            }}
                        >
                            {'X'}
                        </div>
                    </Marker>
                ))}
            </Map>
        </div>
    );
};
