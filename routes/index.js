var express = require('express');
var router = express.Router();

var Person = require('../models/person');

/* GET home page. */
router.get('/', function(req, res, next) {  
  Person.all(function(persons) {    
    res.render('index', { title: 'Node.js com Framework Express', person: persons });
  });
});

router.get('/pesquisar', function(req, res, next) {
  Person.findByName(req.query.name, function(persons) {
      res.render('index', {title: 'Node.js com Framework Express', person: persons});    
  });
});

router.get('/alterar', function(req, res, next) {
  Person.findByCPF(req.query.cpf, function(person) {
    if ( person == null) {
      res.redirect('./');
    }
    else {
      res.render('alterar',  { title: 'Node.js com Framework Express', person: person });    
    }
  });
});

router.post('/alterar-pessoa', function(req, res, next) {
  var person = new Person();

  person.name = req.body.name;
  person.lastName = req.body.lastName;
  person.cpf = req.body.cpf;
  person.phone = req.body.phone;
  person.address = req.body.address;

  person.save(function() {  
    res.redirect('./');       
  }, req.query.cpf);
});

router.get('/excluir', function(req, res, next) {
  Person.delete(req.query.cpf, function() {      
      res.redirect('/');
  });  
});

router.post('/cadastrar-pessoa', function(req, res, next) {
  var person = new Person();

  person.name = req.body.name;
  person.lastName = req.body.lastName;
  person.cpf = req.body.cpf;
  person.phone = req.body.phone;
  person.address = req.body.address;

  person.save(function(persons) {  
    res.render('index', {title: 'cadastrar-pessoa', person: persons});       
  });

});

module.exports = router;
