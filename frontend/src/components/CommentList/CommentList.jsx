import React from 'react'
import styles from "./CommentList.module.scss";
import Comment from "../Comment/Comment";

const CommentList = ({ comments }) => {
  return (
    <>
           <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <div className={styles.noComments}>No comments posted</div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
    </>
  )
}

export default CommentList