
import type { ReactNode } from 'react'
import type { Location } from '../../vite-env'
import styles from './base.module.css'

export function Dropdown({locations, handling}: {locations: Location[], handling: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}): ReactNode{

    function locationsList(locations: Location[]): ReactNode[]{
        let buttonList: ReactNode[] = []

        locations.forEach((location) => {
            buttonList.push(
            <button className={styles.location} type="button" onClick={(e) => handling(e)} value={JSON.stringify(location)}>
                {location.name}{location.state ? `, ${location.state}` : ''}
            </button>
        )})

        return buttonList
    }

    return (
        <div className={styles.total}>
            {locationsList(locations)}
        </div>
    )
}