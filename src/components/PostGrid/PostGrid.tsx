import { Link, NavLink } from "react-router-dom";
import { IPost } from "../../types";
import Post from "../Post/Post";
import './PostGrid.scss';

const PostGrid = ({ posts = [] }: { posts: IPost[] }) => (
    <div className='PostGrid'>
        {posts?.map((post: IPost, index: number) => (
            <div className="grid-item" key={index + 'post'} >
                <NavLink to={`/post/${post._id}`}>
                    <img src={post.images[0]} />
                </NavLink>
            </div>
        ))}
    </div>
)

export default PostGrid
