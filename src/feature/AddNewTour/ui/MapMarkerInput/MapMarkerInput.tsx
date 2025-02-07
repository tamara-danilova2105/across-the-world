import { Stack } from "@/shared/ui/Stack";
import styles from './MapMarkerInput.module.scss';
import { AdminMap } from "@/entities/Mapbox";
import { MapMarker } from "@/entities/Tours/model/types/types"; //TODO public api

interface MapMarkerInputProps {
    markers?: MapMarker[];
    onChange: (markers?: MapMarker[]) => void;
}

export const MapMarkerInput = (props: MapMarkerInputProps) => {
    const { markers, onChange } = props;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            onChange(undefined);
        } else {
            onChange([]);
        }
    };

    return (
        <Stack direction="column" gap="24">
            <Stack direction="column" gap="16" max>
                <Stack gap="8" align='center'>
                    <input
                        type="checkbox"
                        id="hasMapMarkers"
                        checked={markers !== undefined}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                    />
                    <label htmlFor="hasMapMarkers" className={styles.label}>
                        Добавить маркеры на карту
                    </label>
                </Stack>

                {markers !== undefined && (
                    <AdminMap
                        markers={markers}
                        onChange={onChange}
                    />
                )}
            </Stack>
        </Stack>
    );
};