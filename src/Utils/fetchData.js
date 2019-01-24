import axios from 'axios';

const BASE_URL = 'https://lloyd-news.herokuapp.com/api';


export const fetchArticle = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
    return data;
}


export const fetchComments = async (id, sort_by = 'created_at', p = 1, limit=10) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments?sort_by=${sort_by}&p=${p}&limit=${limit}`);
    return data.comments;
}

export const deleteData = async (articleid, commentid) => {
    console.log(articleid, commentid)
    const url = commentid ? 
        `https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}` :
        `https://lloyd-news.herokuapp.com/api/articles/${articleid}`;
    console.log(url)
    await axios.delete(url)
    .then(() => {
        console.log('getting to delewted');
    })
    
    
   
}

export const fetchTopics = async () => {
    const { data } = await axios.get(`${BASE_URL}/topics`);
    return data.topics;
}


export const fetchUser = async(user) => {
    const { data } = await axios.get(`${BASE_URL}/users/${user}`);
    return data.user;
}


export const fetchArticles = async (slug, sort_by='created_at', p=1) => {
    console.log('here')
    const request = slug ? 
        `${BASE_URL}/topics/${slug}/articles?sort_by=${sort_by}&p=${p}` :
        `${BASE_URL}/articles?sort_by=${sort_by}&p=${p}`;

    const { data } = await axios.get(request);
    return data.articles;
}

export const fetchMostRecentArticles = async (sort_by) => {
    const { data } = await axios.get(`${BASE_URL}/articles?limit=3&sort_by=${sort_by}`)
    return data.articles
}