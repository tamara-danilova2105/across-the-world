export interface Image {
    _id: string;
    src: string;
    alt: string;
    file?: File;
};

export interface Function {
    handleChangeState?: () => void;
    showExplain?: () => void | undefined;
}