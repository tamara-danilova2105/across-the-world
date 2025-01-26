export interface Image {
    _id: string;
    src: string;
    file?: File;
};

export interface ChangeStateProps {
    handleChangeState?: () => void;
    showExplain?: () => void;
}