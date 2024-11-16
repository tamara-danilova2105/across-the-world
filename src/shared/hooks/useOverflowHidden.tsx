import { useEffect } from 'react';

export const useOverflowHidden = (isOpen: boolean) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
};
