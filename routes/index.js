var express = require('express');
var router = express.Router();

var person = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.js com Framework Express', person: person });
});

router.post('/cadastrar-pessoa', function(req, res, next) {
  
  person.push( {
    name: req.body.name,
    lastName: req.body.lastName,
    cpf: req.body.cpf,
    phone: req.body.phone,
    address: req.body.address
  });

  res.render('index', {title: 'cadastrar-pessoa', person: person});   
});

module.exports = router;
