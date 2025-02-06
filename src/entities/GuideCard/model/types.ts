import { LucideProps } from "lucide-react";

export interface GuideData {
    _id: string;
    name: string;
    story: string;
    image: string;
    svg: React.ComponentType<LucideProps>;
}
