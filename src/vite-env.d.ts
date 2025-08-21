/// <reference types="vite/client" />

export interface UserData {

}

export interface PostData {
    mediaUrl: string
    description: string | null
    tags: Tag[] | null
    createdAt?: string
}

export interface PosterData {
    profilePicture: string | null
    displayName: string
    locationStr: string | null
}

export interface Tag {
    name: string
}
