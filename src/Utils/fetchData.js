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

export const deleteData = async (commentid, articleid) => {
    
    axios.delete(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`);
    console.log('inside delete', commentid, articleid);
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
    console.log(data, 'after request ')
    return data.articles;
}