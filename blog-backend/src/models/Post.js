module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Post', // 테이블의 이름을 지정합니다.
      {
       title: {
        type: DataTypes.STRING(50),
        allowNull : false
       },
       body: {
         type: DataTypes.STRING(200),
         allowNull: false
       },
       publishedDate: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW
       }
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
      }
  )};