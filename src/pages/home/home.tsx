import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_FOLLWER_POST } from "../../gqlOperations/queries";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRouteContant } from "../../constants";
import './home.scss'
import { ClipLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import { IPost } from "../../types";

const Home = () => {
    const { data, error, loading, fetchMore } = useQuery(GET_FOLLWER_POST, {
        variables: {
            userId: localStorage.getItem('id'),
            offset: 0,
            limit: 4
        },
        fetchPolicy: 'no-cache'
    })
    const [postlist, setPostList] = useState<IPost[]>([]);
    const homepageRef = useRef<any>(null);
    const [moreLoading, setMoreLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(false);

    const fetchMoreFollowerPost = async () => {
        console.log("fetchMoreFollowerPost");
        setMoreLoading(true)
        try {
            const data = await fetchMore({
                variables: {
                    userId: localStorage.getItem('id'),
                    offset: postlist?.length,
                    limit: 3
                },
            })
            setMoreLoading(false);
            setPostList([...postlist, ...data.data.postsByFollower]);
            setLimitReached(!(data.data.postsByFollower.length > 0))
        } catch (e) {
            console.log(e)
        }
        setMoreLoading(false)
    }

    const onScroll = (evt: any) => {
        if (limitReached) {
            return
        }
        if (homepageRef.current && homepageRef.current.scrollTop + homepageRef.current.clientHeight >= (homepageRef.current.scrollHeight - 100) && !moreLoading) {
            console.log('Scrolled to the bottom', postlist?.length);
            fetchMoreFollowerPost();
        }
    }

    useEffect(() => {
        console.log("useEffect");
        if (data?.postsByFollower?.length) {
            setPostList(data.postsByFollower)
        }
    }, [data?.postsByFollower]);

    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)
    return (
        <div ref={homepageRef} className="homepage" onScroll={onScroll}>
            {postlist.length ? postlist?.map((quote: any, index: number) => (
                <div className="post-container" key={index + 'post'} >
                    <Post {...quote} />
                </div>
            )) : <div className="new-post"> <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> </div>
            }
            {
                moreLoading && <div className="flex justify-center p-2">
                    <ClipLoader color="var(--theme)" aria-label="Loading Spinner"
                        data-testid="loader" size={30}
                    />
                </div>
            }
        </div >
    )
}
export default Home;