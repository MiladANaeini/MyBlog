import { create } from 'zustand'

export type Status = "Draft" | "Posted"
export type BlogPosts = {
    id: string
    username: string
    description: string
    status: Status
}

export type State = {
    blogPosts : BlogPosts[]
}


const useStore = create(() => ({}))