import React, {useState} from 'react';

import axios from 'axios';
import {useHistory} from 'react-router-dom';

const NewPost = () => {
    const [post, setPost] = useState({poster: '', title: '', text: ''});
    const history = useHistory();
    const {poster, title, text} = post;

    const onTextChange = e => {
        setPost({...post,
        [e.target.name]: e.target.value
        
    })};

    const onSubmitClick = async () => {
        const {data} = await axios.post('/api/blog/addpost', post);
        history.push(`/viewblog/${data.id}`);
    }

   
    return(
        <div className="col-md-8 offsett-md-2 card card-body bg-light">
            <h3>Add New Post</h3>
            <input type="text"
                className="form-control"
                name="poster"
                value={poster}
                onChange={onTextChange}
                placeholder="Name" />
            <br/>
            <input type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={onTextChange}
                placeholder="Title" />
            <br/>
            <textarea name="text"
                className="form-control"
                value={text}
                onChange={onTextChange}
                rows="20"
                placeholder="Whats on your mind?"></textarea>
            <br/>
            <button className="btn btn-primary" onClick={onSubmitClick}>Submit</button>
        </div> 
    )
}
export default NewPost;