import { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import along from '@turf/along';
import length from '@turf/length';

export interface MovingMarkerProps {
    routeData: GeoJSON.Feature<GeoJSON.LineString>;
    duration?: number;
}

const calculateRotationAngle = (
    currentPosition: [number, number],
    nextPosition: [number, number]
): number => {
    const [lng1, lat1] = currentPosition;
    const [lng2, lat2] = nextPosition;

    const deltaLng = lng2 - lng1;
    const deltaLat = lat2 - lat1;

    return (Math.atan2(deltaLng, deltaLat) * 180) / Math.PI;
};

export const MovingMarker = ({ routeData, duration = 10000 }: MovingMarkerProps) => {
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
    const routeLength = length(routeData);
    let start: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) % duration;
        const percentage = progress / duration;

        // Get point along the route
        const point = along(routeData, routeLength * percentage);
        const coordinates = point.geometry.coordinates as [number, number];

        // Calculate rotation angle based on current and next position
        const nextPoint = along(routeData, routeLength * ((progress + 100) / duration));
        const angle = calculateRotationAngle(
            coordinates,
            nextPoint.geometry.coordinates as [number, number]
        );

        setPosition(coordinates);
        setRotation(angle);

        animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
        if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [routeData, duration]);

    return (
        <Marker longitude={position[0]} latitude={position[1]} anchor="center">
            <div style={{ transform: `rotate(${rotation}deg)`, fontSize: '24px' }}>
                ✈️
            </div>
        </Marker>
    );
};