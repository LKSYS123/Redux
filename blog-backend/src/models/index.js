'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
  env
];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('===== DB 연결 성공 =====');
  })
  .catch(err => {
    console.log('===== DB 연결 실패 =====> ', err);
  });

db.Sports = require('./sports')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.UserInfo = require('./UserInfo')(sequelize, Sequelize);

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;