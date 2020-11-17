import { Flow } from './../flow/flow.model';
export interface DiagramAPI{
    hasNext: boolean;
    items: DiagramResponse[];
}

export interface Diagram{
    id?: string
    name: string
    flow?: Flow
}

export interface DiagramResponse{
    id: string
    name: string
    flow: Flow,
    sketchVersion: number
}