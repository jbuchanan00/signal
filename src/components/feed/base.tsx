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

    const backendAPI = process.env.REACT_APP_BACKEND_URL

    function handling(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        console.log("Handling:", e)
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
        const res = await fetch(`${backendAPI}/location/autofill?text=${query}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        if(searchInput.length < 3){
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
                <Search searchChange={searchChange} />
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
