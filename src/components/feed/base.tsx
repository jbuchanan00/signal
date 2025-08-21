
import styles from'./base.module.css'

import { Post } from '../post'

export function Feed(){
    const postTags = [{name: "Hello"}, {name: "Blackwork"}]
    //I think the best way to determine if a post has been liked by the user is to take what the user has liked, hash it, then in each post check if the postid hashed exists
    return (
        <div className={styles.feed}>
            <Post userData={null} postData={{tags: postTags, createdAt: '2025-08-12 22:00:01.41', mediaUrl: '/test/test-post-picture.jpg', description: null}} posterData={null}/>
            <Post userData={null} postData={null} posterData={null}/>
            <Post userData={null} postData={null} posterData={null}/>
        </div>
    )
}