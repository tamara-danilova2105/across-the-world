import { Stack } from "@/shared/ui/Stack";
import { Button } from "@/shared/ui/Button";
import styles from './Filterbar.module.scss';
import { useState } from "react";

interface FilterbarProps {
    filtredTours: (filter: string) => void;
}

export const Filterbar = (props: FilterbarProps) => {
    const { filtredTours } = props;

    const [activeFilter, setActiveFilter] = useState('все туры');
    const filters = ['все туры', 'Россия', 'Заграница'];

    const handleClick = (filter: string) => {
        setActiveFilter(filter);
        filtredTours(filter);
    };

    return (
        <Stack 
            gap="16" 
            align="center"
            justify='end' 
            className={styles.filterbar}
        >
            {filters.map(filter => (
                <Button 
                    key={filter} 
                    color={filter === activeFilter ? 'primary' : 'outline'}
                    onClick={() => handleClick(filter)}
                >
                    {filter}
                </Button>
            ))}
        </Stack>
    );
};
