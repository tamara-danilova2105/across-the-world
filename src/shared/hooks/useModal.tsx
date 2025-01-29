import { Modal } from "@/entities/Modal";
import { ReactNode, useEffect, useState } from "react";

type UseModalReturn = [
    () => void,
    (children: ReactNode, withAnimation?: boolean, modalType?: string) => JSX.Element | null,
    boolean
];

export const useModal = (): UseModalReturn => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<string | null>(null);

    const changeOpen = (modalType?: string) => {
        if (modalType) {
            setCurrentModal(modalType);
        } else {
            setCurrentModal(null);
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const drawModal = (
        children: ReactNode,
        withAnimation = true,
        modalType?: string
    ): JSX.Element | null => {
        const shouldRender =
            isOpen && (!modalType || currentModal === modalType);

        return shouldRender ? (
            <Modal setIsOpen={setIsOpen} withAnimation={withAnimation}>
                {children}
            </Modal>
        ) : null;
    };

    return [changeOpen, drawModal, isOpen];
};
