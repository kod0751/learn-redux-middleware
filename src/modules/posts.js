import * as postsAPI from '../api/posts';
import { createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';
import { call, put, takeEvery } from 'redux-saga/effects'

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POSTBYID = 'GET_POSTBYID';
const GET_POSTBYID_SUCCESS = 'GET_POSTBYID_SUCCESS';
const GET_POSTBYID_ERROR = 'GET_POSTBYID_ERROR'; 

const CLEAR_POST = 'CLEAR_POST';

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPostById = createPromiseThunkById(GET_POSTBYID, postsAPI.getPostById);  redux-thunk

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = id => ({ 
    type: GET_POSTBYID, 
    payload: id,
    meta: id,
});  //redux-saga

function* getPostsSaga() {
    try {
        const posts = yield call(postsAPI.getPosts);
        yield put({
            type: GET_POSTS_SUCCESS,
            payload: posts,
        });
    } catch (e) {
        yield put({
            type: GET_POSTS_ERROR,
            payload: e,
            error: true
        });
    }
}

function* getPostByIdSaga(action) {
    const id = action.payload;
    try {
        const postById = yield call(postsAPI.getPostById, id);
        yield put({
            type: GET_POSTBYID_SUCCESS,
            payload: postById,
            meta: id
        });
    } catch (e) {
        yield put({
            type: GET_POSTBYID_ERROR,
            payload: e,
            error: true,
            meta: id
        });
    }
};

export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POSTBYID, getPostByIdSaga);
}

export const goToHome = () => (dispatch, getState, { history }) => {
    history.push('/');
}

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