import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
    id: string;
    coordinates: [number, number];
    value: string;
}

export const AdminMap = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [currentValue, setCurrentValue] = useState<string>('');

    const accessToken = 'ВАШ_ТОКЕН_MAPBOX';

    // Обработчик клика на карте для добавления точки
    const handleMapClick = (event: any) => {
        const { lng, lat } = event.lngLat;
        const id = `location-${locations.length + 1}`;
        setLocations([...locations, { id, coordinates: [lng, lat], value: currentValue }]);
        setCurrentValue('');
    };

  // Удаление точки
    const removeLocation = (id: string) => {
        setLocations(locations.filter((location) => location.id !== id));
    };

  // Генерация маршрута
    const route = locations.map((location) => location.coordinates);

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
                onClick={handleMapClick} // Клик для добавления точки
            >
                {/* Маркеры */}
                {locations.map((location) => (
                <Marker
                    key={location.id}
                    longitude={location.coordinates[0]}
                    latitude={location.coordinates[1]}
                    anchor="bottom"
                >
                    <div
                        style={{
                            backgroundColor: 'limegreen',
                            color: 'white',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => removeLocation(location.id)} // Удаление точки
                    >
                    {location.value || 'X'}
                    </div>
                </Marker>
                ))}
            </Map>

            <div style={{ padding: '10px' }}>
                <label>
                    Значение точки:
                    <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        placeholder="Введите значение для точки"
                    />
                </label>
                <button
                    onClick={() => {
                        console.log(JSON.stringify({ locations, route }));
                        alert('Данные сохранены в консоль');
                    }}
                >
                    `Сохранить маршрут
                </button>
            </div>
        </div>
    );
};
