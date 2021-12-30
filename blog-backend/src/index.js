const express = require('express');
const router = require('./route');
const app = express();
const PORT = process.env.PORT || 4000;
const sequelize = require('./models').sequelize;

sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`====${PORT}번 포트로 접속 성공성공====`);
});