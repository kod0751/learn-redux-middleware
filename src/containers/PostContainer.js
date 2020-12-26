import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { clearPost, getPostById } from '../modules/posts';

function PostContainer({ postId }) {
    const { data, loading, error } = useSelector(state => state.posts.postById);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById(postId));
        return () => {
            dispatch(clearPost());
        };
    }, [postId, dispatch])

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러 발생!</div>
    if (!data) return null;

  return(
    <Post post={data}/>
  );
}

export default PostContainer;