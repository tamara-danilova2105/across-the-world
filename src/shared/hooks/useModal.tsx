
import { Modal } from "@/entities/Modal";
import { ReactNode, useEffect, useState } from "react";

type UseModalReturn = [
    () => void,
    (children: ReactNode) => JSX.Element | null,
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

    const drawModal = (children: ReactNode): JSX.Element | null => {
        return (
            isOpen ? (
                <Modal setIsOpen={setIsOpen}>
                    {children}
                </Modal>
            ) : null
        );
    };

    return [changeOpen, drawModal, isOpen];
};