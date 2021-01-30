var App = require('../config/app');

function Person() {
    this.name = '';
    this.lastName = '';
    this.cpf = '';
    this.phone = '';
    this.address = '';

    this.save = function(callback, cpf) {
        var cpf = cpf;

        var nameInstance = this.name;
        var lastNameInstance = this.lastName;
        var cpfInstance = this.cpf;
        var phoneInstance = this.phone;
        var addressInstance = this.address;

        Person.all(function(persons) {
            if ( cpf == undefined ) {
                persons.push( {
                    name: nameInstance,
                    lastName: lastNameInstance,
                    cpf: cpfInstance,
                    phone: phoneInstance,
                    address: addressInstance
                });
            }
            else {
                for ( var i = 0, length = persons.length;  i < length; i = i + 1 ){
                    if( cpf == persons[i].cpf ) {
                      persons[i].name = nameInstance;
                      persons[i].lastName = lastNameInstance;
                      persons[i].cpf = cpfInstance;
                      persons[i].phone = phoneInstance;
                      persons[i].address = addressInstance;
            
                      break;
                    }
                }
            }

            Person.saveAll(persons);

            callback.call(null, persons)
        });
    };       
}

Person.saveAll = function(persons) {
    var fs = require('fs');
    
    fs.writeFile(App.FILE_BASE, JSON.stringify(persons), function (err,data) {
        if (err) {
          console.log(err);
        }                
    });
}

Person.all = function(callback) {
    var fs = require('fs');

    fs.readFile(App.FILE_BASE, function (err,dataDB) {
        var persons = [];

        if (err) {
          console.log(err);
        }
        else {
          try {
            persons = JSON.parse(dataDB);
          }
          catch( e ) {
            console.log( e.message );
          }
        }
        
        callback.call(null, persons)
      });
};

Person.findByName = function(name, callback) {
    Person.all(function(personsDB) {
        var regex = new RegExp( name, 'i' );
        var persons = [];

        if ( name.trim() == '' ) {
            persons = personsDB;
        }
        else {
            personsDB.forEach(function( person ) {  
                if( regex.test( person.name ) ) {
                    persons.push( person );
                }
            } );
        }

        callback.call(null, persons);          
    });
};

Person.findByCPF = function(cpf, callback) {
    Person.all(function(personsDB) {
        var found = null;

        personsDB.forEach(function( person ) {  
            if( cpf == person.cpf ) {
                found = person;
            }
        });

        callback.call(null, found);          
    });
}

Person.delete = function(cpf, callback) {
    Person.all(function(persons) {
        for ( var i = 0, length = persons.length;  i < length; i = i + 1 ){
            if( cpf == persons[i].cpf ) {
              
              if ( i == 0 ) {
                persons.shift();
              }
              else if ( i == length - 1 ) {
                persons.pop();
              }
              else {
                var first = persons.slice(0, i);
                var last  = persons.slice(i+1);
        
                persons = first.concat(last);
              }
        
              break;
            }
        }

        Person.saveAll(persons);
    });

    callback.call(null, null);
};


module.exports = Person;