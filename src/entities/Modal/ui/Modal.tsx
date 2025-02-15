import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { motion as m } from "framer-motion";
import { Portal } from '@/shared/ui/Portal';
import { CloseIcon } from '@/shared/assets/svg/closeIcon';
import styles from './Modal.module.scss';
import { getStyles } from '@/shared/lib/getStyles';

const portalElement = document.getElementById('app') ?? document.body;

interface ModalProps {
    children: ReactNode;
    setIsOpen: (value: boolean) => void;
    withAnimation: boolean;
    isMobile?: boolean;
}

export const Modal = (props: ModalProps) => {

    const { children, setIsOpen, withAnimation, isMobile } = props;

    const overlayRef = useRef<HTMLDivElement>(null);

    const closeModal = () => setIsOpen(false);

    // const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    //     if (e.target === overlayRef.current) closeModal();
    // };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) closeModal();
    };
    

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <Portal element={portalElement}>
            <div 
                className={styles.modal}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className={getStyles(styles.overlay, {[styles.mobile_shedule]: isMobile}, [])}
                    ref={overlayRef}
                    onClick={handleClick}
                >
                    <button 
                        onClick={() => setIsOpen(false)}
                        aria-label="Закрыть модальное окно"
                        className={styles.close}
                    >
                        <CloseIcon />
                    </button>
                    {withAnimation ? (
                        <m.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </m.div>
                    ): (
                        <>{children}</>
                    )}
                </div>
            </div>
        </Portal>
    );
};