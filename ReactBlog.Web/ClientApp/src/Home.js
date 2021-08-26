import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostPage from './PostPage';


const Home = () => {
   const [posts, setPosts] = useState([]);
   
   useEffect(() => {
       const getPosts = async () => {
           const {data} = await axios.get('/api/blog/getposts');
           setPosts(data);
       }
       getPosts();
   },[]);

    return (
        <div className="row">
            <div className="col-md-8">
                <h1 className="my-4">
                    My Blog
                </h1>
                {!!posts && posts.map(post => <PostPage post={post} key={post.id} />)}
            </div>
            </div>
   )
}
export default Home;