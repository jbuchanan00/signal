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

export interface Location {
    city: string,
    city_ascii: string,
    state_id: string,
    state_name: string,
    lat: number,
    lng: number,
    population: number,
    ranking: number,
    id: number
}
