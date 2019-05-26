var express = require('express');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, user: {id:req.user._id , name:req.user.username}, status: 'You are successfully logged in!'});
  });

router.get('/logout' , (req,res) => {
  if (req.session) {
    req.session.destroy();
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
