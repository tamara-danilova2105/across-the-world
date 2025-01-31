import { Image } from "@/shared/types/types";

export interface Details {
    header: string;
    category: string;
    describe: string;
}

export interface TimerData {
    _id: string;
    title: string;
    description: string;
    timer: string;
    imagesArray: Image[];
    imagesDetails: Details[];
}