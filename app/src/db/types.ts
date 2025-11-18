export type Project = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
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