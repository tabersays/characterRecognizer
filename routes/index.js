var express = require('express');
var router = express.Router();
var tesseract = require('node-tesseract');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
  console.log('test');
  tesseract.process(__dirname + req.files,function(err, text) {
    if(err) {
      res.send(req.files);
    } else {
      res.send(req.files);
    }
  });
});

module.exports = router;