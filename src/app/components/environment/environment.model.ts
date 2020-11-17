export interface EnvironmentAPI{
    hasNext: boolean;
    items: EnvironmentResponse[];
}

export interface Environment{
    name?: string,
    componentId?: string,
    type?: string,
    baseURL?: string
}

export interface EnvironmentResponse{
    id?: string
    name?: string
}


