export interface Review {
    _id: string;
    name: string;
    createdAt: string;
    feedback: string;
    city?: string;
    tourId: string
}