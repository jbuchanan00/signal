/// <reference types="vite/client" />

export interface UserData {

}

export interface PostData {
    body: string | null
    tags: Tag[] | null
    createdAt: string
    updatedAt?: string
    source?: string
    role?: number
    mediaType?: number
    id: string
    imageId?: string
}

export interface PosterData {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string | null
    avatarExtension: string | null
    roleId: number | null
    location: Location | null
    bio: string | null
    shopId: string | null
}

export interface Tag {
    name: string
}

export interface Location {
    name: string,
    state: string,
    latitude: number,
    longitude: number,
    population: number,
    ranking: number,
    id: number
}
