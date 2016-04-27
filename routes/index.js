var express = require('express');
var router = express.Router();
var tesseract = require('node-tesseract');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
  tesseract.process(__dirname + req.files,function(err, text) {
    if(err) {
      console.log(req.files);
      res.send(req.files);
    } else {
      console.log(req.files);
      res.send(req.files);
    }
  });
});

module.exports = router;