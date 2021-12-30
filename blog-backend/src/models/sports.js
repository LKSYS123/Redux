module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'sports', // 테이블의 이름을 지정합니다.
      {
       name: {
        type: DataTypes.STRING(20),
        allowNull : true
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
      }
  )};