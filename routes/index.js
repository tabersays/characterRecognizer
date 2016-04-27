var express = require('express');
var router = express.Router();
var tesseract = require('node-tesseract');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
  tesseract.process(__dirname + req.body.image,function(err, text) {
    if(err) {
      res.send(req.body);
    } else {
      res.send(req.body);
    }
  });
});

module.exports = router;