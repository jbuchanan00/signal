import styles from'./base.module.css'

import {Search} from '../search'
import { useEffect, useState} from 'react'
import { Dropdown } from '../dropdown'
import { DisplayPost } from '../displayPost'
import type { PostData, PosterData } from '../../vite-env'

export function Feed(){
    const [searchInput, setSearchInput] = useState('')
    const [locationsList, setLocationsList] = useState([])
    const [postList, setPostList] = useState<{post: PostData, user: PosterData, shop: null}[]>()
    const [radius, setRadius] = useState(20)

    const backendAPI = 'http://localhost:8082'

    async function handling(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const target = e.target as HTMLTextAreaElement
        const val = JSON.parse(target.value as string)
        const body = {
            loc: {
                lat: val.latitude,
                lng: val.longitude
            },
            radius
        }
        const res = await fetch(`${backendAPI}/posts/search`, {
            body: JSON.stringify(body), 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Res")
        const data: [{post: PostData, user: PosterData, shop: null}] | null = await res.json()
        console.log("Data", data)
        if(data && data.length > 0){
            setPostList(data)
        }
        setSearchInput('')
    }

    function displayPosts(){
        if(!postList){
            return (
                <div>
                </div>
            )
        }
        return (
            postList.map((val, i) => {
                return (
                    <div key={i}>
                        <DisplayPost postData={val.post} posterData={val.user} shop={null}/>
                    </div>
                )
            })
        )
    }

    function displayDropdown(){
        if(searchInput){
            return <Dropdown locations={locationsList} handling={handling}/>
        }else{
            return null
        }
    }

    async function searchChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log('Search change')
        const text = e.target.value
        setSearchInput(text)
    }

    async function getAutofillSuggestions(query: string){
        const res = await fetch(`${backendAPI}/api/location/autofill?text=${query}`)
        const data = await res.json()
        if(!data){
            return ['None Found']
        }
        return data
    }

    function handleRadiusClick(e: React.ChangeEvent<HTMLSelectElement>){
        setRadius(parseInt(e.target.value))
    }

    useEffect(() => {
        if(searchInput.length < 3){
            setLocationsList([])
            return
        }
        const handler = setTimeout(async () => {
        const locations = await getAutofillSuggestions(searchInput);
        setLocationsList(locations)
        }, 500);

        return () => {
        clearTimeout(handler);
        };
    }, [searchInput])

    return (
        <div className={styles.home}>
            <div className={styles.search}>
                <Search searchChange={searchChange} handleRadiusClick={handleRadiusClick} />
            </div>
            <div className={styles.dropdown}>
                {displayDropdown()}
            </div>
            <div className={styles.feed}>
                {postList && postList.length > 0 ? displayPosts() : null}
            </div>
        </div>
    )
}
