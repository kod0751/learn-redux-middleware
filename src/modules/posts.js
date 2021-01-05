import * as postsAPI from '../api/posts';
import { createPromiseSaga, createPromiseSagaById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils'; // createPromiseThunk, createPromiseThunkById redux-thunk
import { takeEvery, getContext } from 'redux-saga/effects'

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POSTBYID = 'GET_POSTBYID';
const GET_POSTBYID_SUCCESS = 'GET_POSTBYID_SUCCESS';
const GET_POSTBYID_ERROR = 'GET_POSTBYID_ERROR'; 
const GO_TO_HOME = 'GO_TO_HOME';

const CLEAR_POST = 'CLEAR_POST';

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPostById = createPromiseThunkById(GET_POSTBYID, postsAPI.getPostById);  redux-thunk

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = id => ({ 
    type: GET_POSTBYID, 
    payload: id,
    meta: id,
});  //redux-saga

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostByIdSaga = createPromiseSagaById(GET_POSTBYID, postsAPI.getPostById);
function* goToHomeSaga() {
    const history = yield getContext('history');
    history.push('/');
}

export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POSTBYID, getPostByIdSaga);
    yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

export const goToHome = () => ({ type: GO_TO_HOME });

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