import type { ReactElement, ReactNode } from "react";
import type { PostData, PosterData } from "../../vite-env";
import { Tag } from '../tag';
import styles from './base.module.css'



export function DisplayPost({postData, posterData}: {postData: PostData | null, posterData: PosterData | null}): ReactNode{
    console.log(postData, posterData)
    const SECONDS = 1000
    const MINUTES = SECONDS * 60
    const HOURS = MINUTES * 60
    const DAYS = HOURS * 24
    const WEEKS = DAYS * 7
    const MONTHS = WEEKS * 4
    const YEARS = MONTHS * 12
    
    const postUrl = "./test/test-post-picture.jpg";

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


    return (
        <div className={styles.body}>
            <img src={`${postData?.mediaUrl ?? postUrl}`} alt="post" />
            <div className={styles.tags}>
                {renderTags()}
            </div>
            <div className={styles.name}>
                {posterData?.displayName ?? "John Doe"}
            </div>
            <div className={styles.store}>
                {posterData?.shopName ?? "Independent"}
            </div>
            <div className={styles.timeandsource}>
                <div className={styles.time}>
                    {formatTime()}
                </div>
                <div className={styles.source}>
                    <img src={postData?.source === "instagram" ? "./icons/instagram-icon.jpg" : "./icons/inkedout-icon.png"} />
                </div>
            </div>
        </div>
    )
}