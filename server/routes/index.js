const axios = require('axios')
const express = require('express');
const router = express.Router();

const redis = require('redis')
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})
client.connect();

const REDIS_TIME = 300
const LIMIT_DATA = 10

async function checkCache(variable) {
    const data = await client.get(variable);
    if (data) {
        return data;
    }
}

router.get('/categories', async (req, res) => {
    const categories = await checkCache('categories');
    if (categories) {
        res.status(200).send(JSON.parse(categories))
    } else {
        await axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                client.setEx('categories', REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

router.get('/products', async (req, res) => {
    const products = await checkCache(`products-${req.headers["skip"]}`);
    if (products) {
        res.status(200).send(JSON.parse(products))
    } else {
        const url = `https://dummyjson.com/products/?limit=${LIMIT_DATA}&skip=${(req.headers["skip"]) * req.headers["pagesize"]}`
        await axios.get(url)
            .then(response => {
                client.setEx(`products-${req.headers["skip"]}`, REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

router.get('/products/category/:name', async (req, res) => {
    const products = await checkCache(`products-category-${req.params.name}-${req.headers["skip"]}`);
    if (products) {
        res.status(200).send(JSON.parse(products))
    } else {
        const url = 'https://dummyjson.com/products/category/' + req.params.name + `/?limit=${LIMIT_DATA}` + `&skip=${(req.headers["skip"]) * req.headers["pagesize"]}`
        await axios.get(url)
            .then(response => {
                client.setEx(`products-category-${req.params.name}-${req.headers["skip"]}`, REDIS_TIME, JSON.stringify(response.data))
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(500).json({ message: error })
            })
    }
});

module.exports = router;