import React, { useEffect, useState } from "react";
import { blogByID, deleteBlog, getCommentById, postComment } from "../../api/internal";
import styles from "./BlogDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentList from "../../components/CommentList/CommentList";
import Loader from "../../components/Loader/Loader";

const BlogDetails = () => {
  const [showBlog, setShowBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false)
  const navigate = useNavigate();
  const  params = useParams();
  const  blogId = params.id
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    (async function getBlogsDetails() {
      const blogResponse = await blogByID(blogId);
      if (blogResponse.status === 200) {
        setShowBlog(blogResponse.data.blog);
      }
      const commentResponse = await getCommentById(blogId);
      if (commentResponse.status === 200) {
        // set ownership
        setOwnsBlog(username === blogResponse.data.blog.authorUsername);
        setComments(commentResponse.data.data);
      }
    })();
    
 
  }, [reload]);

  


  const postCommentHandler = async () => {
    const data = {
        author: userId,
        blog: blogId,
        content: newComment
    }
    try {
        const response = await postComment(data)
            if(response.status === 201 ){
                setNewComment('');
                setReload(!reload);
            }
    } catch (error) {
        
    }
  }
  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId)
    if(response.status === 200 ){
        navigate('/')
    }
  }

  if(showBlog.length === 0) {
    return <Loader text={"Blog Details"} />
  }

  return (
    <>
      <div className="container">
        <h2 className="my-5 text-center">Blog Details</h2>
        <div className={styles.cardMain}>
          <div className="row d-flex justify-content-center mb-5">
            <div className="col-md-7 col-12 mt-4">
              <div className={styles.card}>
                <div className={styles.imgMain}>
                  <img
                    src={showBlog.photo}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className={styles.card_body}>
                  <h5 className="card-title">{showBlog.title}</h5>
                  <p>{showBlog.content}</p>
                  <p>@{showBlog.authorUsername + " on " + new Date(showBlog.createdAt).toDateString()}</p>
                  {ownsBlog && (
          <div className={styles.controls}>
            <button
              className={styles.editButton}
              onClick={() => {
                navigate(`/blog-update/${showBlog._id}`);
              }}
            >
              Edit
            </button>
            <button className={styles.deleteButton} onClick={deleteBlogHandler}>
              Delete
            </button>
          </div>
        )}
                </div>
              </div>
            </div>

            <div className="col-md-5 col-12 mt-4 ">
              <div className={styles.commentsWrapper}>
                <CommentList comments={comments} />
                <div className={styles.postComment}>
                  <input
                    className={styles.input}
                    placeholder="comment goes here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className={styles.postCommentButton}
                    onClick={postCommentHandler}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
