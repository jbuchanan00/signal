import styles from './base.module.css'

export function Tag({tagName}: {tagName: string}){
    return (
        <div className={styles.tag}>
            #{tagName}
        </div>
    )
}