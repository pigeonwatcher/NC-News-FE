import ArticleList from '../components/ArticleList';
import { getArticles } from '../api';
import { useState, useEffect } from 'react';

export default function HomePage() {

    const { articles, isLoading, error } = getArticles();

    if (isLoading) return <div>Loading...</div>;
    if (error) {console.log(error); return <div>Error: {error.msg}</div>;}
    if (articles.length === 0 || articles === undefined) return <div>No articles found</div>;

    return (
        <>
        <ArticleList articles={articles} />
        </>
    )
}