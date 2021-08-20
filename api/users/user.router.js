const {createUsers,loginUser,users}=require('../users/user.controller');
const router=require('express').Router();
const {checkToken}=require('./auth/token_validation');

//Create User
router.post('/register',createUsers);
//login user
router.post('/login',loginUser);
// user data
router.get('/users',checkToken,users);
module.exports=router;