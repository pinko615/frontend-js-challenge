export interface UpdateTrendRequest {
    title?: string;
    body?: string;
    url?: string;
    image?: string;
    provider?: string;
}

export interface UpdateTrendResponse {
    modified: number;
}
