var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mobiletimeline', { title: '모바일 타임라인 페이지' });
});

module.exports = router;
