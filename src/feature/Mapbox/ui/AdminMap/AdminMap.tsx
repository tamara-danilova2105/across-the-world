import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Button } from '@/shared/ui/Button';
import styles from './AdminMap.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
    id: string;
    coordinates: number[];
};

export const AdminMap = () => {
    const [locations, setLocations] = useState<Location[]>([]);

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const handleMapClick = (event: any) => {
        const { lng, lat } = event.lngLat;
        const newId = `location-${Date.now()}`;
        if (!locations.some(location => location.id === newId)) {
            setLocations([
                ...locations, 
                { 
                    id: newId, 
                    coordinates: [lng, lat],
                }
            ]);
        }
    };

    const removeLocation = (id: string) => {
        setLocations(locations.filter((location) => location.id !== id));
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

            <Button
                onClick={() => {
                    console.log(JSON.stringify({ locations }));
                    alert('Данные сохранены в консоль');
                }}
            >
                Сохранить маршрут
            </Button>
        </div>
    );
};
