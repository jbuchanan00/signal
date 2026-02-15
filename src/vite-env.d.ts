/// <reference types="vite/client" />

export interface UserData {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string | null,
    avatar_extension: string | null,
    role_id: number | null,
    location: {lat: string, long: string} | null,
    bio: string | null,
    shop_id: string | null
}

export interface PostData {
    mediaUrl: string
    description: string | null
    tags: Tag[] | null
    createdAt?: string
    source?: string
}

export interface PosterData {
    profilePicture: string | null
    displayName: string
    locationStr: string | null
    shopName: string | null
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
