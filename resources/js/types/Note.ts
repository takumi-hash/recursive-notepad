export type Note = {
    id: number;
    title: string;
    children?: Note[];
    body: string;
    previewBody?: string;
    cleanHtml?: string;
    created_at?: Date;
    updated_at?: Date;
};
