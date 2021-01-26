var express = require('express');
var router = express.Router();
var fs = require('fs');

var person = [];
var FILE_BASE = 'base-de-dados.txt';

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = { title: 'Node.js com Framework Express' };
  data['person'] = [];

  load(function (err,dataDB) {
    if (err) {
      console.log(err);
    }
    else {
      try {
        data['person'] = JSON.parse(dataDB);
      }
      catch( e ) {
        console.log( e.message );
      }
    }
    
    res.render('index', data);
  });
});

router.get('/pesquisar', function(req, res, next) {
  var data = { title: 'Node.js com Framework Express' };

  load(function (err,dataDB) {
    if (err) {
      console.log(err);

      data['person'] = [];
    }
    else {
      var personsDB = JSON.parse(dataDB);
      var persons = [];
      var name = req.query.name;

      if ( name.trim() == '' ) {
        data['person'] = personsDB;
      }
      else {
        var regex = new RegExp( name, 'i' );

        personsDB.forEach(function( person ) {  
          if( regex.test( person.name ) ) {
            persons.push( person );
          }
        } );

        data['person'] = persons;
      }
      
      res.render('index', data);    }
    
  });
});

router.get('/alterar', function(req, res, next) {
  var data = { title: 'Node.js com Framework Express' };

  load(function (err,dataDB) {
    if (err) {
      console.log(err);

      data['person'] = [];
    }
    else {
      var personsDB = JSON.parse(dataDB);
      var person = {};

      var cpf = req.query.cpf;

      for ( var i = 0, length = personsDB.length;  i < length; i = i + 1 ){
        if( cpf == personsDB[i].cpf ) {
          person = personsDB[i];

          break;
        }
      }

      data['person'] = person;
      
      res.render('alterar', data);
    }
    
  });
});

router.post('/alterar-pessoa', function(req, res, next) {
  load(function (err,dataDB) {
    if (err) {
      console.log(err);

      res.redirect('/');
    }
    else {
      var person = JSON.parse(dataDB);

      var cpf = req.query.cpf;

      for ( var i = 0, length = person.length;  i < length; i = i + 1 ){
        if( cpf == person[i].cpf ) {
          person[i].name = req.body.name;
          person[i].lastName = req.body.lastName;
          person[i].cpf = req.body.cpf;
          person[i].phone = req.body.phone;
          person[i].address = req.body.address;

          break;
        }
      }

      save(person);
      
      res.redirect('/');
    }
    
  });
});

router.get('/excluir', function(req, res, next) {
  load(function (err,dataDB) {
    if (err) {
      console.log(err);

      res.redirect('/');
    }
    else {
      var person = JSON.parse(dataDB);

      var cpf = req.query.cpf;

      del(person, cpf);    
      
      res.redirect('/');
    }
    
  });
});

router.post('/cadastrar-pessoa', function(req, res, next) {
  load(function (err,dataDB) {
    if (err) {
      return console.log(err);
    }

    try {
      person = JSON.parse(dataDB);
    }
    catch( e ) {
      person = [];
    }
    
    person.push( {
      name: req.body.name,
      lastName: req.body.lastName,
      cpf: req.body.cpf,
      phone: req.body.phone,
      address: req.body.address
    });
    
    save(person);
  
    res.render('index', {title: 'cadastrar-pessoa', person: person});   
    
  });

});


function load( callback ){
  fs.readFile(FILE_BASE, callback);
}

function save(person) {  
  fs.writeFile(FILE_BASE, JSON.stringify(person), function (err,data) {
    if (err) {
      console.log(err);
    }
    
  });  
}

function del(person, cpf) {
  for ( var i = 0, length = person.length;  i < length; i = i + 1 ){
    if( cpf == person[i].cpf ) {
      
      if ( i == 0 ) {
        person.shift();
      }
      else if ( i == length - 1 ) {
        person.pop();
      }
      else {
        var first = person.slice(0, i);
        var last  =person.slice(i+1);

        person = first.concat(last);
      }

      break;
    }
  }

  save(person);
}

module.exports = router;
