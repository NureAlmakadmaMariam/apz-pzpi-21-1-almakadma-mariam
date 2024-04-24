/*// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Сервер Node.js з базою даних PostgreSQL працює успішно!');
});

const port =  3000;

app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
*/