const axios = require('axios')
const express = require('express');
const router = express.Router();

router.get('/categories', async (req, res) => {
    await axios.get('https://dummyjson.com/products/categories')
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(500).json({ message: error })
        })
});

module.exports = router;