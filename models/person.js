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

        var query;
        
        
        if ( cpf == undefined ) {
            query = 'INSERT INTO empresa.pessoas(name, lastName, cpf, phone, address) values("' + nameInstance + '", "' + lastNameInstance + '", "' + cpfInstance + '", "' + phoneInstance + '", "' + addressInstance + '")';              
        }
        else {
            query = 'UPDATE empresa.pessoas SET name="' + nameInstance + '", lastName="' + lastNameInstance + '", cpf="' + cpfInstance + '", phone="' + phoneInstance + '", address="' + addressInstance + '" WHERE cpf="' + cpf + '"'; 
        }            

        App.db.cnn.exec( query, function( rows, err) {        
            if ( err ) {
                console.log( 'Erro na query( ' + query + ' )' );
                callback.call( null );
            }
            else  {
                callback.call( null );
            }
        } );
    };       
}

Person.all = function(callback) {
    var query = 'SELECT * FROM empresa.pessoas';
    App.db.cnn.exec( query, function( rows, err) {        
        if ( err ) {
            callback.call( null, [] );
            console.log( 'Erro na query( ' + query + ' )' );
        }
        else  {
            callback.call( null, rows );
        }
    } );
};

Person.findByName = function(name, callback) {
    var query = 'SELECT * FROM empresa.pessoas WHERE name LIKE "%' + name + '%"';
    App.db.cnn.exec( query, function( rows, err) {        
        if ( err ) {
            callback.call( null, [] );
            console.log( 'Erro na query( ' + query + ' )' );
        }
        else  {
            callback.call( null, rows );
        }
    } );
};

Person.findByCPF = function(cpf, callback) {
    var query = 'SELECT * FROM empresa.pessoas WHERE cpf="' + cpf + '"';

    App.db.cnn.exec( query, function( rows, err) {        
        if ( err ) {
            callback.call( null, [] );
            console.log( 'Erro na query( ' + query + ' )' );
        }
        else  {
            callback.call( null, rows[0] );
        }
    } );
}

Person.delete = function(cpf, callback) {
    var query = 'DELETE FROM empresa.pessoas WHERE cpf="' + cpf + '"';

    App.db.cnn.exec( query, function( rows, err) {        
        if ( err ) {
            callback.call();
            console.log( 'Erro na query( ' + query + ' )' );
        }
        else  {
            callback.call();
        }
    } );
};


module.exports = Person;