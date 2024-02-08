import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import ErrorHandler from '../components/ErrorHandler';
import { Route, Routes } from "react-router-dom";

export default function Routers() {
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/article/:article_id" element={<ArticlePage />}/>
            <Route path="*" element={<ErrorHandler error={{ code: 404, message: "Page does not exist!" }} />} />
            <Route path="/user" element=""/>
        </Routes>
    )
}