import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MovingMarker } from './ui/MovingMarker';

interface Location {
    id: string;
    coordinates: [number, number];
};

interface RouteMapProps {
    locations: Location[];
};

export const RouteMap = ({ locations }: RouteMapProps) => {

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const routeCoordinates = locations.map((location) => location.coordinates);

    const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
        },
    };

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Map
                mapboxAccessToken={accessToken}
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

                <Source id="route" type="geojson" data={geojson}>
                    <Layer
                        id="route-line"
                        type="line"
                        paint={{
                            "line-color": "#FF0000",
                            "line-width": 4,
                        }}
                    />
                </Source>

                <MovingMarker routeData={geojson} />
            </Map>
        </div>
    );
};
