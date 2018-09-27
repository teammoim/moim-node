var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('setting', { title: '설정 페이지' });
});

module.exports = router;
