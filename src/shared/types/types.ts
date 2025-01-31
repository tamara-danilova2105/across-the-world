export interface Image {
    _id: string;
    src: string;
    file?: File;
}

export interface Region {
    _id: string;
    direction: string;
    region: string;
    __v: number;
}

export interface ChangeStateProps {
    handleChangeState?: () => void;
    showExplain?: () => void;
}