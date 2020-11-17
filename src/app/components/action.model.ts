export interface ActionAPI{
    hasNext: boolean;
    items: ActionResponse[];
}

export interface ActionResponse{
    id: string,
    name: string,
    type?: any,
    model?: any
}