import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import { format } from 'date-fns';

const PostPage = ({post}) => {
    const { id, poster, title, text, datePosted, comments } = post;
    const commentCount = comments.length;
    const getText = () => {
        if (text.length < 200) {
            return text;
        }
        return text.substring(0, 200) + "...";
    }

    return(
        <div className="card-mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/viewBlog/${id}`}>  {title} </Link></h2>
                <p className="card-text">{getText}</p>
                <div className="mb-3">
                    <small>{commentCount} comment(s)</small>
                </div>
                <Link to={`/viewBlog/${id}`} className="btn btn-primary">
                    Read More &rarr </Link>
                </div>
            <div className="card-footer text-muted">
                Posted on {format(new Date(datePosted), 'cccc MMMM Lo, yyyy')}
                </div>
                
            </div>
    )
}
export default PostPage;