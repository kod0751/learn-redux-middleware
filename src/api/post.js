const sleep =  n => new Promise(resolve => setTimeout(resolve, n));

// { id, title, body }
const posts = [
    {
        id: 1,
        title: '리덕스 미들웨어',
        body: '리덕스 미들웨어 만들기'
    }, 
    {
        id: 2,
        title: 'redux-thunk',
        body: 'redux-thunk 만들기'
    }, 
    {
        id: 3,
        title: 'redux-saga',
        body: 'redux-saga 만들기'
    }, 
]

export const getPosts = async () => {
    await sleep(500);
    return posts;
}

export const getPostById = async id => {
    await sleep(500);
    return posts.find(post => post.id === id);
}