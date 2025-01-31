import { useEffect, useState } from 'react';

interface DebounceTypes {
    value: string;
    delay: number;
}

export const useDebounce = ({value, delay} : DebounceTypes) => {
    
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        };
    }, [value, delay])

    return debouncedValue;
}