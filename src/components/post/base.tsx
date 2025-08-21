import type { ReactElement } from 'react';
import type { PostData, PosterData, UserData } from '../../vite-env';
import { Tag } from '../tag';
import styles from './base.module.css'

export function Post({userData, postData, posterData}: {userData: UserData | null, postData: PostData | null, posterData: PosterData | null}){
    const SECONDS = 1000
    const MINUTES = SECONDS * 60
    const HOURS = MINUTES * 60
    const DAYS = HOURS * 24
    const WEEKS = DAYS * 7
    const MONTHS = WEEKS * 4
    const YEARS = MONTHS * 12

    const postUrl = "./test/test-post-picture.jpg";
    const base = "."
    console.log(userData, postData, posterData)

    function renderTags(): ReactElement{
        if(!postData?.tags || postData.tags.length < 1 ){
            return <div></div>
        }else{
            return (
                <div className={styles.tags}>
                    {postData.tags.map((tag, index) => {
                        return(
                            <div key={index} className={styles.tag}>
                                <Tag tagName={tag.name} />
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    function formatTime(){
        if(postData?.createdAt){
            const timeDif = new Date(Date.now()).valueOf() - new Date(postData.createdAt).valueOf();
            if(timeDif < 30 * SECONDS){
                return 'JUST NOW'
            }else if(timeDif / MINUTES < 1){
                return Math.floor(timeDif / SECONDS) + ' seconds' + ((timeDif / SECONDS) >= 2 ? 's' : '') + ' ago'
            }else if(timeDif / HOURS < 1){
                return Math.floor(timeDif / MINUTES) + ' minute' + ((timeDif / MINUTES) >= 2 ? 's' : '') + ' ago'
            }else if(timeDif / DAYS < 1){
                return Math.floor(timeDif / HOURS) + ' hour' + ((timeDif / HOURS) >= 2 ? 's' : '') + ' ago'
            }else if(timeDif / WEEKS < 1){
                return Math.floor(timeDif / DAYS) + ' day' + ((timeDif / DAYS) >= 2 ? 's' : '') + ' ago'
            }else if(timeDif / MONTHS < 1){
                return Math.floor(timeDif / WEEKS) + ' week' + ((timeDif / WEEKS) >= 2 ? 's' : '') + ' ago'
            }else if(timeDif / YEARS < 1){
                return Math.floor(timeDif / MONTHS) + ' month' + ((timeDif / MONTHS) >= 2 ? 's' : '') + ' ago'
            }else{
                return Math.floor(timeDif / YEARS) + ' year' + ((timeDif / YEARS) >= 2 ? 's' : '') + ' ago'
            }
        }else{
            return 'Missing'
        }
    }

    return(
        <div className={styles.full}>
            <div className={styles.heading}>
                <div className={styles.profileInfo}>
                    <div className={`${styles.profilePicture} ${styles.standardCont}`}>
                        <img src={posterData?.profilePicture ?? `${base}/placeholder/profile-temp.png`} alt="profile" />
                    </div>
                    <div className={styles.profileMeta}>
                        <h4 className={styles.profileName}>{posterData?.displayName ?? 'Name'}</h4>
                        <h6 className={styles.profileLocation}>{posterData?.locationStr ?? 'City, St'}</h6>
                    </div>
                </div>
                <div className={styles.more}>
                    <button type="button" className={`${styles.moreButton} ${styles.standardCont}`}><img src={`${base}/icons/menu-dots.png`} alt="more" /></button>
                </div>
            </div>
            <div className={styles.body}>
                <img src={`${postData?.mediaUrl ?? postUrl}`} alt="post" />
            </div>
            <div className={styles.actions}>
                <div className={styles.leftButtons}>
                    <button type="button" className={`${styles.actionButton} ${styles.standardCont}`}><img src={`${base}/icons/heart.svg`} alt="heart" /></button>
                    <button type="button" className={`${styles.actionButton} ${styles.standardCont}`}><img src={`${base}/icons/comment.svg`} alt="comment" /></button>
                    <button type="button" className={`${styles.actionButton} ${styles.standardCont}`}><img src={`${base}/icons/upload.svg`} alt="share" /></button>
                </div>
                <div className={styles.rightButton}>
                    <button type="button"className={`${styles.actionButton} ${styles.standardCont}`}><img src={`${base}/icons/bookmark.svg`} alt="bookmark" /></button>
                </div>
            </div>
            <div className={styles.metadata}>
                <div className={styles.likeHeading}>
                    <h4>0 LIKES</h4>
                </div>
                <div className={styles.description}>
                    <div className={styles.descriptionName}>
                        {posterData?.displayName ?? 'Name'}
                    </div>
                    <div className={styles.descriptionBody}>
                        {postData?.description ?? 'Description'}
                    </div>
                </div>
                <div className={styles.tags}>
                    {renderTags()}
                </div>
                <div className={styles.commentViewing}>
                    <a href="/addpost">View all {0} comments</a>
                </div>
                <div className={styles.timeStamp}>
                    {formatTime()}
                </div>
            </div>
        </div>
    )
}