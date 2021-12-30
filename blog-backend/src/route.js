const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get/data', controller.api.getData);
router.post('/add/data', controller.api.addData);
router.post('/update/data', controller.api.updateData);
router.post('/delete/data', controller.api.deleteData);

router.post('/api/addPost', controller.api.addPost);
router.get('/api/posts', controller.api.getPostList);
router.get('/api/post/:id', controller.api.getPost);
router.post('/api/updatePost/:id', controller.api.updatePost);
router.post('/api/deletePost/:id', controller.api.deletePost);

router.post('/api/register', controller.api.register);
router.post('/api/login', controller.api.login);
router.post('/api/loginCheck/:UserId', controller.api.loginCheck);
router.post('/api/logout', controller.api.logout);

module.exports = router;