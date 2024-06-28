import axios from "axios";
import { configDotenv } from 'dotenv';

configDotenv();

class ArticleController {
    static async getArticle(req, res) {
        const apiKey = process.env.NEWS_API_KEY;
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=mental+health+diseases+OR+mental+health+prevention+OR+mental+health+cure&pageSize=15&apiKey=${apiKey}`
            );
            const articles = response.data.articles.map(article => ({
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
            }));
            res.json(articles);
        } catch (error) {
            res.status(500).send('Error fetching articles');
        }
    }

    static async getArticleBySearch(req, res) {
        const  {search } = req.body;
        if (!search) return res.status(401).json({ error: 'Missing Search' });

        const words = search.split(' '); // Split the string by spaces
        const joinedString = words.join('+');

        const apiKey = process.env.NEWS_API_KEY;
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${joinedString}&pageSize=15&apiKey=${apiKey}`
            );
            const articles = response.data.articles.map(article => ({
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
            }));
            res.json(articles);
        } catch (error) {
            res.status(500).send('Error fetching articles');
        }



    }
}

export default ArticleController;