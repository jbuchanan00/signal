import { useState } from 'react'
import styles from './base.module.css'

export function Search({searchChange}: {searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void}){
    const [location, setLocation] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setLocation(e.target.value)
        searchChange(e)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    }
    
    return (
        <div className={styles.search}>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <label>Search
                    <input type="text" onChange={handleChange} value={location}/>
                </label>
            </form>
        </div>
    )
}