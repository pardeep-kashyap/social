import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import { GETALLPOST } from "../../gqlOperations/queries";
import './Reel.scss';
import { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { IPost } from "../../types";
import PostGrid from "../../components/PostGrid/PostGrid";
import Search from "../Search/Search";
const limit = 8;
const Reel = () => {
    const { data, error, loading, fetchMore } = useQuery(GETALLPOST, {
        variables: {
            offset: 0,
            limit
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
                    offset: postlist?.length,
                    limit
                },
            })
            setMoreLoading(false);
            setPostList([...postlist, ...data.data.allPost]);
            setLimitReached(!(data.data.allPost.length > 0))
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
        if (data?.allPost?.length) {
            setPostList(data.allPost)
        }
    }, [data?.allPost]);

    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)
    return (
        <div ref={homepageRef} className="reel-container" onScroll={onScroll}>
            <Search />
            {postlist.length > 0 && <PostGrid posts={postlist} />
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
export default Reel;