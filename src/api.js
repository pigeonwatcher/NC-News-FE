import axios from 'axios';

export async function getArticles(topic, sort_by, order) {
    const params = {
        topic: topic !== "All" ? topic : undefined,
        sort_by: sort_by,
        order: order
    }

    const { data: {articles} } = await axios.get(`https://nc-news-th0a.onrender.com/api/articles`, { params: params });
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

export async function deleteComment(comment_id) {

    const { data: { comment } } = await axios.delete(`https://nc-news-th0a.onrender.com/api/comments/${comment_id}`);
    return comment;
}

export async function getTopics () {
    const { data: {topics} } = await axios.get(`https://nc-news-th0a.onrender.com/api/topics`);
    return topics;
};