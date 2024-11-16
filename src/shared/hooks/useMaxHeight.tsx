import { useLayoutEffect, useRef, useState } from 'react';

export const useMaxHeight = (initialHeight: number, itemsCount: number) => {
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [maxHeight, setMaxHeight] = useState(initialHeight);
    const [showMoreStates, setShowMoreStates] = useState(Array(itemsCount).fill(false));

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            if (showMoreStates.every((state) => !state)) {
                setMaxHeight(initialHeight);
            } else {
                const heights = itemRefs.current.map((item) => item?.scrollHeight || initialHeight);
                setMaxHeight(Math.max(...heights));
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [showMoreStates]);

    const toggleShowMore = (index: number) => {
        setShowMoreStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return { itemRefs, maxHeight, showMoreStates, toggleShowMore };
};

