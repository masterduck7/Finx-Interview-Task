const express = require('express');
const indexRouter = require('./server/routes/index');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/dist'));
app.listen(3000, () => console.log(`express app running on port ${PORT}`));

app.use('/', indexRouter);
