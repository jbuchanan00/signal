
import type { Location } from '../../vite-env'
import styles from './base.module.css'

export function Dropdown(_locations: Location[], handling: () => {}){

    function locationsList(locations: Location[]){
        return locations.map(location => {
            <button className={styles.location} type="button" onClick={handling} value={JSON.stringify(location)}>
                {location.city}{location.state_id ? `, ${location.state_id}` : ''}
            </button>
        })
    }

    return (
        <div>
            {locationsList(_locations)}
            {/* locations.map()
        <div class="locationContainer" >
            <button class="locationButton" type="button" onclick={(e) => handling(e)} value={JSON.stringify(location)}>
                {location.name}{location.state ? `, ${location.state}` : ''}
            </button>
        </div>
        {/each} */}
        </div>
    )
}