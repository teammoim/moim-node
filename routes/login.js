var express = require('express');
var router = express.Router();
const app = express();

app.post('/login', (req, res) => {
  if (!req.body) {
    res.status(400).send('404 Request');
    return;
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '로그인 페이지' });
});


module.exports = router;
