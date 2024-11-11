import { Stack } from "@/shared/ui/Stack";
import { Button } from "@/shared/ui/Button";
import styles from './Filterbar.module.scss';

export const Filterbar = () => {

    const isActive = 'все туры'; //TODO
    const filters = ['все туры', 'Россия', 'Заграница'];

    return (
        <Stack 
            gap="16" 
            justify='end' 
            className={styles.filterbar}
        >
            {filters.map(filter => (
                <Button 
                    key={filter} 
                    color={filter === isActive ? 'primary' : 'outline'}
                >
                    {filter}
                </Button>
            ))}
        </Stack>
    );
};
