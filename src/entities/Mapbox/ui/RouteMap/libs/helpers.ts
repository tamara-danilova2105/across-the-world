import { Location } from "../RouteMap";

interface Bounds {
    minLng: number;
    maxLng: number;
    minLat: number;
    maxLat: number;
}

export const calculateRouteBounds = (locations: Location[]): Bounds | null => {
    if (!locations.length) return null;

    return locations.reduce(
        (bounds, location) => {
            const [lng, lat] = location.coordinates;
            return {
                minLng: Math.min(bounds.minLng, lng),
                maxLng: Math.max(bounds.maxLng, lng),
                minLat: Math.min(bounds.minLat, lat),
                maxLat: Math.max(bounds.maxLat, lat),
            };
        },
        {
            minLng: locations[0].coordinates[0],
            maxLng: locations[0].coordinates[0],
            minLat: locations[0].coordinates[1],
            maxLat: locations[0].coordinates[1],
        }
    );
};

export const createRouteGeoJson = (locations: Location[]): GeoJSON.Feature<GeoJSON.LineString> => {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: locations.map(location => location.coordinates),
        },
    };
};