import Map, { Marker, Source, Layer } from 'react-map-gl';
import { MovingMarker } from './ui/MovingMarker';
import styles from './RouteMap.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { calculateRouteBounds, createRouteGeoJson } from './libs/helpers';

export interface Location {
    id: string;
    coordinates: [number, number];
};

interface RouteMapProps {
    locations: Location[];
};


export const RouteMap = ({ locations }: RouteMapProps) => {

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const routeCoordinates = locations.map((location) => location.coordinates);

    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || !locations.length) return;

        const bounds = calculateRouteBounds(locations);
        if (!bounds) return;

        mapRef.current.fitBounds(
            [
                [bounds.minLng, bounds.minLat],
                [bounds.maxLng, bounds.maxLat]
            ],
            {
                padding: { top: 50, bottom: 50, left: 50, right: 50 },
                duration: 1000,
                maxZoom: 10
            }
        );
    }, [locations]);

    const onMapLoad = (event: any) => {
        mapRef.current = event.target;
        
        if (locations.length) {
            const bounds = calculateRouteBounds(locations);
            if (!bounds) return;

            event.target.fitBounds(
                [
                    [bounds.minLng, bounds.minLat],
                    [bounds.maxLng, bounds.maxLat]
                ],
                {
                    padding: { top: 50, bottom: 50, left: 50, right: 50 },
                    duration: 0,
                    maxZoom: 10
                }
            );
        }
    };

    return (
        <div className={styles.map_container}>
            <Map
                mapboxAccessToken={accessToken}
                onLoad={onMapLoad}
                initialViewState={{
                    longitude: routeCoordinates[0]?.[0] || 0,
                    latitude: routeCoordinates[0]?.[1] || 0,
                    zoom: 3,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        longitude={location.coordinates[0]}
                        latitude={location.coordinates[1]}
                        anchor="bottom"
                    />
                ))}

                <Source 
                    id="route" 
                    type="geojson" 
                    data={createRouteGeoJson(locations)}
                >
                    <Layer
                        id="route-line"
                        type="line"
                        paint={{
                            "line-color": "#FF0000",
                            "line-width": 4,
                        }}
                    />
                </Source>

                <MovingMarker routeData={createRouteGeoJson(locations)}  />
            </Map>
        </div>
    );
};
