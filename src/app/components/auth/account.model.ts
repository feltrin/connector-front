export interface AccountAPI{
    hasNext: boolean;
    items: Account[];
}

export interface Account{
    id?: string
    name?:string
    modelId?: string
    authType?: string
    componentId?: string
    config?: any
    active?: boolean
    createDate?: string | Date
}