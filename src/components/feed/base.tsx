import styles from'./base.module.css'

import { Post } from '../post'
import {Search} from '../search'
import { useEffect, useState } from 'react'
import { Dropdown } from '../dropdown'

export function Feed(){
    const postTags = [{name: "Hello"}, {name: "Blackwork"}]
    //I think the best way to determine if a post has been liked by the user is to take what the user has liked, hash it, then in each post check if the postid hashed exists
    const [searchInput, setSearchInput] = useState('')
    const [locationsList, setLocationsList] = useState([])
    const [radius, setRadius] = useState(20)

    const backendAPI = 'http://localhost:8082'

    async function handling(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const target = e.target as HTMLTextAreaElement
        const val = JSON.parse(target.value as string)
        console.log("Handling:", target.value, radius)
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
        console.log("Result:", res)
        const data = await res.json()
        console.log(data)
    }

    function displayDropdown(){
        console.log('Display dropdown')
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
                <Post userData={null} postData={{tags: postTags, createdAt: '2025-08-12 22:00:01.41', mediaUrl: '/test/test-post-picture.jpg', description: null}} posterData={null}/>
                <Post userData={null} postData={null} posterData={null}/>
                <Post userData={null} postData={null} posterData={null}/>
            </div>
        </div>
    )
}
