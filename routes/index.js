var express = require('express');
var router = express.Router();
var tesseract = require('node-tesseract');
var multer = require('multer');
var upload = multer({ dest: './uploads' }).any();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
  var name ;//= req.files[0].filename;
  request.get('http://www.homedepot.com/s/549%20742', function(err, res, body) {
    var $ = cheerio.load(body);
    $('.item_price span').remove();
    var something = $('.item_price').text();
    res.send(something);
  });
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    tesseract.process('./uploads/' + name,{config: 'digits'},function(err, text) {
      if(err) {
        res.send(err);
      } else {
        text = text.split('\n');
        /*text = text.map(function(line) {
          line=line.replace(/(\.)*!/g,'');
          line=line.replace(/( )*!/g,'');
          line=line.replace(/(-)*!/g,'');
          if (line.length === 10 || line.length ===12) {
            if(line.length === 10)
              line = line.replace(/(0*)/, '');
            return line;
          }
        });*/
        request.get('http://www.homedepot.com/s/549%20742', function(err, res, body) {
          var $ = cheerio.load(body);
          var something = $('.item_price').first();
          res.send(something);
        });
        //res.send(text);
      }
    });
  });
  /*tesseract.process(__dirname + req.files,function(err, text) {
    if(err) {
      console.log(err);
      res.send(req.files);
    } else {
      console.log(req);
      res.send(req.files);
    }
  });*/
});

module.exports = router;