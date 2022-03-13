export interface Banner {
    id: number;
    title: string;
    brief_content: string;
    full_content: string;
    image: string;
    draft: boolean;
    status: boolean;
    created_at: number;
    last_update: number
}