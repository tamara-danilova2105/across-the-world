import { useMemo, useLayoutEffect, useState, useRef, useEffect, useCallback } from "react";

interface UseCarouselProps {
  children: JSX.Element[];
  autoPlayInterval: number;
}

export const useCarousel = ({ children, autoPlayInterval}: UseCarouselProps) => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  const actionHandler = useCallback((mode: "prev" | "next") => {
      if (!containerRef.current) return;
      
      containerRef.current.style.transitionDuration = "400ms";

      if (mode === "prev") {
        if (current <= 1) {
          setTranslateX(0)
          setCurrent(children.length)
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1))
          setCurrent((prev) => --prev)
        }
      } else if (mode === "next") {
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1)
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1))
          setCurrent((prev) => ++prev)
        }
      }
    },
    [current, children]
  );

  useEffect(() => {
    const transitionEnd = () => {
      if (!containerRef.current) return;

      if (current <= 1) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * current)
      }

      if (current >= children.length) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * children.length)
      }
    };

    containerRef.current?.addEventListener("transitionend", transitionEnd)
    return () => {
      containerRef.current?.removeEventListener("transitionend", transitionEnd)
    };
  }, [current, children])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = window.setInterval(() => {
      actionHandler("next");
    }, autoPlayInterval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler, autoPlayInterval]);

  const slides = useMemo(() => {
    if (children.length > 1) {
      const items = children.map((child, index) => (
        <li key={index}>{child}</li>
      ));

      return [
        <li key={children.length + 1}>{children[children.length - 1]}</li>,
        ...items,
        <li key={children.length + 2}>{children[0]}</li>,
      ];
    }

    return <li>{children[0]}</li>;
  }, [children]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setTranslateX(containerRef.current.clientWidth * current);
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    
    containerRef.current.style.transitionDuration = "400ms";
    setTranslateX(containerRef.current.clientWidth * (index + 1))
    setCurrent(index + 1)
}, []);

  const nextSlide = () => actionHandler("next");
  const prevSlide = () => actionHandler("prev");

  return { containerRef, current, slides, translateX, goToSlide, nextSlide, prevSlide };
};
