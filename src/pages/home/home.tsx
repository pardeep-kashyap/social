import { useQuery } from "@apollo/client";
import Post from "../../components/Post/Post";
import { GET_ALL_POST_BY_USER } from "../../gqlOperations/queries";
import './home.css'

const Home = () => {
    const { data, error, loading } = useQuery(GET_ALL_POST_BY_USER, { variables: { userid: localStorage.getItem('id') } })
    if (loading) return (<div>'Loading...'</div>)
    if (error) return (<div>`Error! ${error?.message}`;</div>)
    console.log(data, error, loading)
    return (
        <div className="post-container">
            {data?.posts.length ? data?.posts?.map((quote: any, index: number) => (
                <Post {...quote} />
            )) : <div style={{ textAlign: 'center' }}>Create New Post</div>
            }
        </div >
    )
}
export default Home;