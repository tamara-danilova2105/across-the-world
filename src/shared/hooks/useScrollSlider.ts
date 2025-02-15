import { useEffect, useRef } from 'react';

interface UseScrollSliderReturn {
    containerRef: React.RefObject<HTMLDivElement>
}

export const useScrollSlider = (width?: number): UseScrollSliderReturn => {
    const containerRef = useRef<HTMLDivElement>(null)

    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    useEffect(() => {
        const container = containerRef.current;
        console.log(container)

        if (container && width && width > 590) {
            container.scrollLeft = 0;
        }

        const handleWheel = (e: WheelEvent) => {
            if (!container) return;
            container.scrollLeft += e.deltaX
        }

        const handleMouseDown = (e: MouseEvent) => {
            if (!container) return
            isDragging.current = true
            startX.current = e.pageX - container.offsetLeft
            scrollLeft.current = container.scrollLeft
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !container) return
            const x = e.pageX - container.offsetLeft
            const walk = (x - startX.current)
            container.scrollLeft = scrollLeft.current - walk
        }

        const handleMouseUp = () => {
            isDragging.current = false;
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (!container || e.touches.length === 0) return;
            isDragging.current = true;
            startX.current = e.touches[0].pageX - container.offsetLeft;
            scrollLeft.current = container.scrollLeft;
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging.current || !container || e.touches.length === 0) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = x - startX.current;
            container.scrollLeft = scrollLeft.current - walk;
        }

        const handleTouchEnd = () => {
            isDragging.current = false;
        }

        if (container) {
            container.addEventListener('wheel', handleWheel)
            container.addEventListener('mousedown', handleMouseDown)
            container.addEventListener('mousemove', handleMouseMove)
            container.addEventListener('mouseup', handleMouseUp)
            container.addEventListener('mouseleave', handleMouseUp)

            container.addEventListener('touchstart', handleTouchStart
            );
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel)
                container.removeEventListener('mousedown', handleMouseDown)
                container.removeEventListener('mousemove', handleMouseMove)
                container.removeEventListener('mouseup', handleMouseUp)
                container.removeEventListener('mouseleave', handleMouseUp)

                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        }
    }, [width])

    return {
        containerRef
    }
}
