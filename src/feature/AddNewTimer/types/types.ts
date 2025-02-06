export interface ImagesWithDetails {
    _id: string;
    src: string;
    file?: File;
    header: string;
    category: string;
    describe: string;
}


export interface TimerData {
    title: string;
    region: string;
    description: string;
    timer: string;
    imagesWithDetails: ImagesWithDetails[]
}

export const PLACEHOLDER_TEXT: Record<string, string> = {
    header: "название места",
    category: "категория достопримечательности",
    describe: "короткое описание места"
}

const LABEL: Record<string, string> = {
    header: "Название",
    category: "Категория",
    describe: "Красткое описание"
}

export const getLabel = (field: string) => {
    return LABEL[field]
}