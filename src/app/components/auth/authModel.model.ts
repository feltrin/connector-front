export interface AuthModelAPI{
    hasNext: boolean;
    items: AuthModel[];
}

export interface AuthModel{
    id?: string
    type: string
    model?: any
}