import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollSliderReturn {
    containerRef: React.RefObject<HTMLDivElement>
    currentSlide: number
    nextCard: () => void
    prevCard: () => void
    handleClickSlide: (selectedSlider: number) => void
}

export const useScrollSlider = (quantityCards: number, initialIndex: number = 0): UseScrollSliderReturn => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentSlide, setCurrentSlide] = useState<number>(initialIndex)

    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const handleClickSlide = useCallback((selectedSlider: number) => {
        setCurrentSlide(selectedSlider)
    }, [])

    const nextCard = useCallback(() => {
        setCurrentSlide((prev) => (prev === quantityCards - 1 ? 0 : prev + 1))
    }, [quantityCards])

    const prevCard = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? quantityCards - 1 : prev - 1))
    }, [quantityCards])


    useEffect(() => {
        const container = containerRef.current;

        const handleWheel = (e: WheelEvent) => {
            if (!container) return;
            container.scrollLeft += e.deltaY || e.deltaX
        }

        const handleMouseDown = (e: MouseEvent) => {
            if (!container) return
            isDragging.current = true
            startX.current = e.pageX - container.offsetLeft
            scrollLeft.current = container.scrollLeft
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !container) return
            e.preventDefault()
            const x = e.pageX - container.offsetLeft
            const walk = (x - startX.current)
            container.scrollLeft = scrollLeft.current - walk
        }

        const handleMouseUp = () => {
            isDragging.current = false;
        }

        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            container.addEventListener('mousedown', handleMouseDown)
            container.addEventListener('mousemove', handleMouseMove)
            container.addEventListener('mouseup', handleMouseUp)
            container.addEventListener('mouseleave', handleMouseUp)
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel)
                container.removeEventListener('mousedown', handleMouseDown)
                container.removeEventListener('mousemove', handleMouseMove)
                container.removeEventListener('mouseup', handleMouseUp)
                container.removeEventListener('mouseleave', handleMouseUp)
            }
        }
    }, [])

    return {
        containerRef,
        currentSlide,
        nextCard,
        prevCard,
        handleClickSlide,
    }
}
