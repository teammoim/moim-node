var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gpsmap', { title: '이벤트 지도' });
});

module.exports = router;
