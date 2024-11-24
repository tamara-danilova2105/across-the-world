import { MouseEvent, ReactNode } from 'react';
import { motion as m } from "framer-motion";
import { Portal } from '@/shared/ui/Portal';
import { CloseIcon } from '@/shared/assets/svg/closeIcon';
import styles from './Modal.module.scss';

interface ModalProps {
    children: ReactNode;
    setIsOpen: (value: boolean) => void;
    withAnimation: boolean;
}

export const Modal = (props: ModalProps) => {

    const { children, setIsOpen, withAnimation } = props;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.dataset.class === 'overlay') {
            setIsOpen(false);
        }
    };

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={styles.modal}>
                <div
                    className={styles.overlay}
                    data-class="overlay"
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