
import { Modal } from "@/entities/Modal";
import { ReactNode, useEffect, useState } from "react";

type UseModalReturn = [
    () => void,
    (children: ReactNode, withAnimation?: boolean) => JSX.Element | null,
    boolean
];

export const useModal = (): UseModalReturn => {
    const [isOpen, setIsOpen] = useState(false);

    const changeOpen = () => {
        setIsOpen(p => !p);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const drawModal = (children: ReactNode, withAnimation = true): JSX.Element | null => {
        return (
            isOpen ? (
                <Modal 
                    setIsOpen={setIsOpen} 
                    withAnimation={withAnimation}
                >
                    {children}
                </Modal>
            ) : null
        );
    };

    return [changeOpen, drawModal, isOpen];
};