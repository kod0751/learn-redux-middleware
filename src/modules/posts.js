import * as postsAPI from '../api/post';
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = '.posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = './posts/GET_POSTS_ERROR';

const GET_POSTBYID = 'posts/GET_POSTBYID';
const GET_POSTBYID_SUCCESS = 'posts/GET_POSTBYID_SUCCESS';
const GET_POSTBYID_ERROR = 'posts/GET_POSTBYID_ERROR'; 

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPostById = createPromiseThunk(GET_POSTBYID, postsAPI.getPostById);

const initialState = {
    posts: reducerUtils.initial(),
    postById: reducerUtils.initial()
}

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts');
const getPostByIdReducer = handleAsyncActions(GET_POSTBYID, 'postById');

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return getPostsReducer(state, action);
        case GET_POSTBYID:
        case GET_POSTBYID_SUCCESS:
        case GET_POSTBYID_ERROR:
            return getPostByIdReducer(state, action);
        default:
            return state;
    }
}