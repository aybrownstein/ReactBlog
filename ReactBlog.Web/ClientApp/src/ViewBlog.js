import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {format} from 'date-fns';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import { useParams } from 'react-router-dom';

const ViewBlog = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [blogPost, setBlogPost] = useState({poster: '', title: '', text: '', datePosted: ''});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            const {data} = await axios.get(`/api/blog/getblogpost?id=${id}`);
            const {poster, title, text, datePosted, comments} = data;
            setBlogPost({poster, title, text, datePosted});
            setComments(comments);
            setIsLoading(false);
        }
        getPost();
    });

    const onCommentSubmission = async () => {
        const {data} = await axios.get(`api/blog/getcomments?blogpostid=${id}`);
        setComments(data);
    }

    return(
        <div className="row">
            <div className="col-lg-8">
                {isLoading && <h2>Loading...</h2>}
                {!isLoading &&
                <>
                <h1 className="mt-4">{blogPost.title}</h1>
                <p className="lead">by: {blogPost.poster}</p>
                <hr/>
                {blogPost.text.split('\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
                <hr/>
                <AddCommentForm onSubmission={onCommentSubmission}/>

                {comments.map(c => <Comment comment={c} key={c.id}/>)}
                </>
}
            </div>
        </div>
    )
}
export default ViewBlog;