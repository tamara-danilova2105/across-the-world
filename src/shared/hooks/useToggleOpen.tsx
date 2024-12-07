import { useState, useRef, useEffect, useCallback } from 'react';


export const useToggleOpen = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false); 
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        isOpen,
        closeMenu,
        toggleMenu,
        menuRef,
    }
}