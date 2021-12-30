const sequelize = require('../models').sequelize;

const {
    Sports,
    Post,
    UserInfo,
    Sequelize: { Op }
} = require('../models');
sequelize.query('SET names utf8;')

module.exports = {
    api: {
        // 회원가입
        register: (body, callback) => {
            console.log('req.body =====' + JSON.stringify(body));
            UserInfo.create({
                UserId: body.UserId,
                UserPass: body.UserPass,
                UserName: body.UserName,
            })
                .then(data => {
                    callback(true)
                    console.log('=====데이터 입력 완료=====')
                })
                .catch(err => {
                    console.log('=====데이터 입력 실패=====')
                    console.log(err);
                    throw err;
                })
        },
        // 로그인
        login: (body, callback) => {
            UserInfo.findAll({
                where: { [Op.and]: [{ UserId: body.UserId, UserPass: body.UserPass }] }
            })
                .then(data => {
                    callback(data)
                    console.log('입력된 계정정보 ====> UserId: ' + body.UserId + ' UserPass: ' + body.UserPass);
                    console.log('data ====== ' + JSON.stringify(data));
                })
                .catch(err => {
                    throw err;
                })
        },
        
        // 로그인 체크
        loginCheck: (body, callback) => {
            UserInfo.findAll({
                where: { UserId: body.UserId }
            })
                .then(data => {
                    callback(data)
                    console.log('입력된 계정정보 ====> UserId: ' + body.UserId );
                    console.log('data ====== ' + JSON.stringify(data));
                })
                .catch(err => {
                    throw err;
                })
        },

        // 포스트 입력
        addPost: (body, callback) => {
            console.log('req.body =====' + JSON.stringify(body));
            Post.create({
                title: body.title,
                body: body.body,
            })
                .then(data => {
                    callback(true)
                    console.log('=====포스트 입력 완료=====')
                })
                .catch(err => {
                    console.log('=====포스트 입력 실패=====')
                    console.log(err);
                    throw err;
                })
        },
        // 포스트목록 조회
        getPostList: callback => {
            Post.findAll()
                .then(result => {
                    callback(result);
                    console.log('=====포스트목록 조회 완료=====');
                })
                .catch(err => {
                    console.log('=====포스트목록 조회 실패=====');
                    throw err;
                })
        },

        // 포스트 상세보기
        getPost: (body, callback) => {
            Post.findAll({
                where: { id: body.id }
            })
                .then(result => {
                    callback(result);
                    console.log('=====포스트 조회 완료=====');
                })
                .catch(err => {
                    console.log('=====포스트 조회 실패=====');
                    throw err;
                })
        },

        // 포스트 수정
        updatePost: (body, callback) => {
            Post.update({
                title: body.title,
                body: body.body,
            }, {
                where: { id: body.id }
            })
            .then(result => {
                callback(result);
                console.log('=====포스트 수정 완료=====');
            })
            .catch(err => {
                console.log('=====포스트 수정 실패=====');
                throw err;
            })
        },

        // 포스트 삭제
        deletePost: (body, callback) => {
            Post.destroy({
                where: { id: body.id }
            })
                .then(
                    callback(true),
                    console.log('=====포스트 삭제 성공=====')
                )
                .catch(err => {
                    console.log('=====포스트 삭제 실패=====')
                    throw err
                })
        },

        getData: callback => {
            Sports.findAll()
                .then(result => {
                    callback(result);
                    console.log('=====데이터 조회 완료=====');
                })
                .catch(err => {
                    console.log('=====데이터 조회 실패=====');
                    throw err
                })
        },
        addData: (body, callback) => {
            console.log('req.body =====' + JSON.stringify(body.name));
            Sports.create({
                name: body.name
            })
                .then(data => {
                    callback(true)
                    console.log('=====데이터 입력 완료=====')
                })
                .catch(err => {
                    console.log('=====데이터 입력 실패=====')
                    console.log(err);
                    throw err;
                })
        },
        updateData: (body, callback) => {
            Sports.update({ name: body.update.name }, {
                where: { id: body.update.id }
            })
                .then(data => {
                    callback(true)
                    console.log('=====데이터 수정 완료=====');
                })
                .catch(err => {
                    console.log('=====데이터 수정 실패=====');
                    throw err
                })
        },
        deleteData: (body, callback) => {
            Sports.destroy({
                where: { id: body.delete.id }
            })
                .then(
                    callback(true),
                    console.log('=====데이터 삭제 성공=====')
                )
                .catch(err => {
                    console.log('=====데이터 삭제 실패=====')
                    throw err
                })
        }
    }
}