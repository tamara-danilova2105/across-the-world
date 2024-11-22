import { MouseEvent, ReactNode } from 'react';
import { motion as m } from "framer-motion";
import { getStyles } from '@/shared/lib/getStyles';
import { Portal } from '@/shared/ui/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children: ReactNode;
    setIsOpen: (value: boolean) => void;
}

export const Modal = (props: ModalProps) => {

    const { className, children, setIsOpen } = props;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.dataset.class === 'overlay') {
            setIsOpen(false);
        }
    };

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={getStyles(styles.modal, {}, [className])}>
                <div
                    className={styles.overlay}
                    data-class="overlay"
                    onClick={handleClick}
                >
                    <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </m.div>
                </div>
            </div>
        </Portal>
    );
};