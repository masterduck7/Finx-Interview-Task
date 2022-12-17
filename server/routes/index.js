require("dotenv").config();

const axios = require('axios')
const express = require('express');
const router = express.Router();
const cache = require('../middlewares/cache');

const REDIS_TIME = process.env.REDIS_TIME

router.get('/categories', async (req, res) => {
    const categories = await cache.checkCache('categories');
    if (categories) {
        res.status(200).send(JSON.parse(categories))
    } else {
        await axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                cache.client.setEx('categories', REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

router.get('/products', async (req, res) => {
    const products = await cache.checkCache(`products-${req.headers["skip"]}`);
    if (products) {
        res.status(200).send(JSON.parse(products))
    } else {
        const url = `https://dummyjson.com/products/?limit=10&skip=${(req.headers["skip"]) * req.headers["pagesize"]}`
        await axios.get(url)
            .then(response => {
                cache.client.setEx(`products-${req.headers["skip"]}`, REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

router.get('/products/category/:name', async (req, res) => {
    const products = await cache.checkCache(`products-category-${req.params.name}-${req.headers["skip"]}`);
    if (products) {
        res.status(200).send(JSON.parse(products))
    } else {
        const url = 'https://dummyjson.com/products/category/' + req.params.name + `/?limit=10` + `&skip=${(req.headers["skip"]) * req.headers["pagesize"]}`
        await axios.get(url)
            .then(response => {
                cache.client.setEx(`products-category-${req.params.name}-${req.headers["skip"]}`, REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

module.exports = router;