module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'UserInfo', // 테이블의 이름을 지정합니다.
        {
            UserId: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            UserPass: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            UserName: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};