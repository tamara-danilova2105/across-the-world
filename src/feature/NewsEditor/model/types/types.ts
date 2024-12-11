export interface NewsArticle {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
    publishDate: Date;
    status: 'draft' | 'published';
    author: string;
}