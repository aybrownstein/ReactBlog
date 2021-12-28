import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostPage from './PostPage';
import { Link, useParams } from 'react-router-dom';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const params = useParams();
    const page = parseInt(params.page) || 1;
    const pageCount = 3;
    const isFirstPage = () => page === 1;

    const isLastPage = () => {
        const from = (page - 1) * pageCount;
        const to = from + pageCount;
        return to >= totalCount;
    }
   
   useEffect(() => {
       const getPosts = async () => {
           const {data} = await axios.get(`/api/blog/get?page=${page}`);
           setPosts(data.posts);
           setTotalCount(data.totalCount);
           window.scrollTo(0, 0);
       }
       getPosts();
   },[page]);

    return (
        <div className="row">
            <div className="col-md-8">
                <h1 className="my-4">
                    My Blog
                </h1>
                {!!posts && posts.map(post => <PostPage post={post} key={post.id} />)}
                <ul className="pagination justify-content-center mb-4">
                    {!isLastPage() && <li className="page-item">
                        <Link className="page-link" to={`/page/${page + 1}`}>&larr; Older</Link>
                    </li>}
                    {!isFirstPage() &&
                        <li className="page-item">
                            <Link className="page-link" to={`/page/${page - 1}`}>Newer &rarr;</Link>
                        </li>
                    }
                </ul>
            </div>
            </div>
   )
}
export default Home;