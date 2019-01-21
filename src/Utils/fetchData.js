import axios from 'axios';

const BASE_URL = 'https://lloyd-news.herokuapp.com/api';

export const fetchAllArticles = async() => {
    const { data } = await axios.get(`${BASE_URL}/articles`);
    return data;
}

export const fetchArticle = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
    return data;
}

export const fetchComments = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
    return data;
}