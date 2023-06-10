var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/listyourshow', function(req, res, next) {
  res.render('movielisting');
});

module.exports = router;
