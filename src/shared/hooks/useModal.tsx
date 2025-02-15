import { Modal } from "@/entities/Modal";
import { ReactNode, useEffect, useState } from "react";

type UseModalReturn = [
    (modalType?: string | React.MouseEvent<HTMLButtonElement>) => void, 
    (children: ReactNode, withAnimation?: boolean, modalType?: string) => JSX.Element | null,
    boolean
];

export const useModal = (isMobile?: boolean): UseModalReturn => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<string | null>(null);

    const changeOpen = (modalType?: string | React.MouseEvent<HTMLButtonElement>) => {
        if (typeof modalType === "string") {
            setCurrentModal(modalType)
        } else {
            setCurrentModal(null)
        }
        setIsOpen(p => !p)
    }

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen])

    const drawModal = (
        children: ReactNode,
        withAnimation = true,
        modalType?: string
    ): JSX.Element | null => {
        const shouldRender =
            isOpen && (!modalType || currentModal === modalType);

        return shouldRender ? (
            <Modal setIsOpen={setIsOpen} withAnimation={withAnimation} isMobile={isMobile}>
                {children}
            </Modal>
        ) : null;
    };

    return [changeOpen, drawModal, isOpen];
};
