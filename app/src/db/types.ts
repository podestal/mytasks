export type Project = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    totalSrpints?: number
    completedSprints?: number
}

export type Sprint = {
    id: number
    project_id: number
    name: string
    description: string
    deadline: string
    status: string
    created_at: string
    updated_at: string
}

export type Task = {
    id: number
    sprint_id: number
    description: string
    status: string
    priority: string
    created_at: string
    updated_at: string
}