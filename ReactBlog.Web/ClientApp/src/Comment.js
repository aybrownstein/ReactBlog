import React from 'react';
import {format} from 'date-fns';

const Comment = ({comment}) => {
    return(
        <div className="media mb-4">
            <div className="media-body">
                <h5 className="mt-0">
{comment.commentor} <small className="ml-1">{format(new Date(comment.commentDate), 'cccc MMMM Lo, yyyy')}</small>
                </h5>
                {comment.text}
            </div>
        </div>
    )
}
export default Comment;