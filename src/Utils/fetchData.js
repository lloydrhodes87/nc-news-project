import axios from 'axios';

const BASE_URL = 'https://lloyd-news.herokuapp.com/api';

export const fetchAllArticles = async() => {
    const { data } = await axios.get(`${BASE_URL}/articles`);
    return data.articles;
}

export const fetchArticle = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
    return data;
}

export const fetchComments = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
    console.log(data);
    return data.comments;
}

export const deleteData = async (commentid, articleid) => {
    const { data } = await axios.delete(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`);
    return data;
}

export const fetchTopics = async () => {
    const { data } = await axios.get(`${BASE_URL}/topics`);
    return data.topics;
}

export const fetchArticlesSort = async(query) => {
    const { data } = await axios.get(`${BASE_URL}/articles${query}`);
    return data.articles;
}

// export const changeVote = async (articleid, commentid, vote) => {
//     console.log(vote)
//     const { data } = await axios.patch(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`, vote);
//     return data;
// }