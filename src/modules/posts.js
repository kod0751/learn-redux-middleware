import * as postsAPI from '../api/posts';
import { createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POSTBYID = 'GET_POSTBYID';
const GET_POSTBYID_SUCCESS = 'GET_POSTBYID_SUCCESS';
const GET_POSTBYID_ERROR = 'GET_POSTBYID_ERROR'; 

const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPostById = createPromiseThunkById(GET_POSTBYID, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
    posts: reducerUtils.initial(),
    postById: {}
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostByIdReducer = handleAsyncActionsById(GET_POSTBYID, 'postById', true);

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
        case CLEAR_POST:
            return {
                ...state,
                postById: reducerUtils.initial()
            };
        default:
            return state;
    }
}