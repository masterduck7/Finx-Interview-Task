const axios = require('axios')
const express = require('express');
const router = express.Router();

const LIMIT_DATA = 10

router.get('/categories', async (req, res) => {
    await axios.get('https://dummyjson.com/products/categories')
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(500).json({ message: error })
        })
});

router.get('/products', async (req, res) => {
    await axios.get(`https://dummyjson.com/products/?limit=${LIMIT_DATA}`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(500).json({ message: error })
        })
});

router.get('/products/category/:name', async (req, res) => {
    await axios.get(`https://dummyjson.com/products/category/?limit=${LIMIT_DATA}` + req.params.name)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(500).json({ message: error })
        })
});

router.get('/product/:id', async (req, res) => {
    await axios.get('https://dummyjson.com/products/' + req.params.id)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(500).json({ message: error })
        })
});

module.exports = router;