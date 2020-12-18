import * as postsAPI from '../api/post';
import { reducerUtils } from '../lib/asyncUtils';

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
};

const initialState = {
    posts: reducerUtils.initial(),
    postById: reducerUtils.initial()
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: reducerUtils.loading() //state.posts.data = 기존상태의 값을 null로 바꾸지 않고 유지한다면
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: reducerUtils.success(action.posts)
            };
        case GET_POSTS_ERROR:
            return {
                ...state,
                posts: reducerUtils.error(action.error)
            }
            case GET_POSTBYID:
                return {
                    ...state,
                    postById: reducerUtils.loading()
                };
            case GET_POSTBYID_SUCCESS:
                return {
                    ...state,
                    postById: reducerUtils.success(action.postById)
                };
            case GET_POSTBYID_ERROR:
                return {
                    ...state,
                    postById: reducerUtils.error(action.error)
                }
        default:
            return state;
    }
}