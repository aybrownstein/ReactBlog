import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const AddCommentForm = ({onSubmission}) => {
    const [formData, setFormData] = useState({commenter: '', text: ''});
const {id} = useParams();
const {commenter, text} = formData;

const onTextChange = e => {
setFormData({
    ...formData,
    [e.target.name]:e.target.value
})
}

useEffect(() => {
   const commenterName = localStorage.getItem('commenter-name');
   if(commenterName) {
       setFormData({commenter: commenterName, text: ''});
   } 
},[]);

const onSubmitClick = async () => {
    await axios.post('/api/blog/addcomment', {...formData, PostId: id});
    setFormData({commenter, text: ''});
    localStorage.setItem('commenter-name', formData.commenter);
    onSubmission();
}

return(
    <div className="card my-4">
           <h5 className="card-header">Leave a Comment</h5>
    <div className="card-body">
        <input type="hidden" name="postId" value="3003"/> 
        <div className="form-group">
            <input type="text"
            value={commenter}
            placeholder="Name"
            className="form-control"
            onChange={onTextChange}
            name="commenter"/>
        </div>
        <div className="form-group">
            <textarea placeholder="Type your comment here but remember to be be nice..."
            value={text}
            name="text"
            className="form-control"
            onChange={onTextChange}
            rows="3" />
        </div>
        <button disabled={!commenter || !text}
        onClick={onSubmitClick}
        className="btn btn-primary">Submit</button>
</div>
</div>
              
)
}

export default AddCommentForm;