import * as postsAPI from '../api/post';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = '.posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = './posts/GET_POSTS_ERROR';

const GET_POSTBYID = 'posts/GET_POSTBYID';
const GET_POSTBYID_SUCCESS = 'posts/GET_POSTBYID_SUCCESS';
const GET_POSTBYID_ERROR = 'posts/GET_POSTBYID_ERROR'; 

export const getPosts = () => async dispatch => {
    //요청이 시작됨
    dispatch({ type: GET_POSTS });
    //API를 호출
    try {
        const posts = await postsAPI.getPosts();
    //성공했을 때
        dispatch ({
            type: GET_POSTS_SUCCESS,
            posts
        });
    } catch (e) {
    //실패했을 때
        dispatch ({
            type: GET_POSTS_ERROR,
            error: e
        });
    }
}

export const getPostById = id => async dispatch => {
    //요청이 시작됨
    dispatch({ type: GET_POSTBYID });
    //API를 호출
    try {
        const postById = await postsAPI.getPostBYId(id);
    //성공했을 때
        dispatch ({
            type: GET_POSTBYID_SUCCESS,
            postById
        });
    } catch (e) {
    //실패했을 때
        dispatch ({
            type: GET_POSTBYID_ERROR,
            error: e
        });
    }
}