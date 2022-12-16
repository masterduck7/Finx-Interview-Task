const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Finx');
});

app.listen(3000, () => console.log('express app running on port 3000'));