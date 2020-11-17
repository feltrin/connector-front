export interface Flow{
    async?: boolean
    activities? : any
}

export class Activity{
    id: string
    label?: string
    type?: string
    componentId: string
    configSchema?: any
    configurations?: any
    connections?: Connections
}

export class Connections{
    next: string[]
    previous?: string[]
}