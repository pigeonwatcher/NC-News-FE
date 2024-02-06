import { useState, useEffect } from 'react';
import axios from 'axios';

export async function getArticles() {
    const { data: {articles} } = await axios.get('https://nc-news-th0a.onrender.com/api/articles');
    return articles;
}

export async function getArticle (article_id) {
    const { data: {article} } = await axios.get(`https://nc-news-th0a.onrender.com/api/articles/${article_id}`);
    return article;
};

export async function getComments(article_id) {
    const params = {
        sort_by: "created_at", 
        order: "desc"
    }

    const { data: { comments } } = await axios.get(`https://nc-news-th0a.onrender.com/api/articles/${article_id}/comments`, {params: params});

    return comments;
};

export async function patchVote(article_id, inc) {
    const { data: { article: { votes } } } = await axios.patch(`https://nc-news-th0a.onrender.com/api/articles/${article_id}`, { inc_votes: inc });
    return votes;
}

export async function postComment(article_id, commentToPost) {

    const { data: { comment } } = await axios.post(`https://nc-news-th0a.onrender.com/api/articles/${article_id}/comments`, commentToPost);
    return comment;
}