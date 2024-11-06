import { useEffect, useState } from 'react';

interface Styles {
    [key: string]: string;
}

const useOptimizedNavbarScroll = (styles: Styles) => {

    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
        const navbar = document.querySelector(`.${styles.navbar}`)
        const header = document.querySelector('header')
        const parallax = document.querySelector('figure')

        if (!header || !navbar || !parallax) return

        const headerHeight = header.offsetHeight
        const navbarTop = navbar.getBoundingClientRect().top
        const navbarBottom = navbar.getBoundingClientRect().bottom
        const parallaxBottom = parallax.getBoundingClientRect().bottom

        requestAnimationFrame(() => {
            if (navbarTop <= headerHeight && !isFixed) {
            setIsFixed(true)
        }

        if (navbarBottom >= parallaxBottom && isFixed) {
            setIsFixed(false)
        }
        })
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [isFixed, styles])

    return isFixed
};

export default useOptimizedNavbarScroll;
