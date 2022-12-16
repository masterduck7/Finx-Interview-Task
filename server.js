const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.listen(3000, () => console.log(`express app running on port ${PORT}`));

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'));
});
