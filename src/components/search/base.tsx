import { useState } from 'react'
import styles from './base.module.css'

export function Search({searchChange, handleRadiusClick}: {searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
                                            handleRadiusClick: (e: React.ChangeEvent<HTMLSelectElement>) => void}){
    const [location, setLocation] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setLocation(e.target.value)
        searchChange(e)
    }

    

    
    return (
        <div className={styles.search}>
            <h1>Search</h1>
            <form>
                <label>
                    <input type="text" onChange={handleChange} value={location}/>
                </label>
                <label>
                    <select onChange={(e) => handleRadiusClick(e)}>
                        <option value={5}>5 mi</option>
                        <option value={10}>10 mi</option>
                        <option value={20} selected>20 mi</option>
                        <option value={25}>25 mi</option>
                        <option value={50}>50 mi</option>
                    </select>
                </label>
                
            </form>
        </div>
    )
}