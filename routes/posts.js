const router = require('express').Router();
const user = require('../model/user');
const verifyAuth = require('./verifyToken');

router.get('/', verifyAuth, (req, res) => {
    res.send(req.user);
    user.findOne({ _id: req.user });
    // res.json({
    //     posts: {
    //         title: 'First Posts',
    //         description: 'random data u shouldnt access'
    //     }
    // });
});

module.exports = router;