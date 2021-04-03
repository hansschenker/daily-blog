export interface Link {
    title: string;
    url: string;
}
export interface Post {
    uid?: string;
    title: string;
    text: string;
    author: string;
    category: string;
    links?: Link[];
    tags?: string[];
    datetime: Date;
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
}