
var mysql = require('mysql');
var connectionString = 'mysql://root:prico182@localhost/empresa';

var db = {};
db.cnn = {};
db.cnn.exec = function( query, callback ) {
    var connection = mysql.createConnection( connectionString );
    connection.query( query, function( err, rows) {
        callback( rows, err );
        connection.end();
    } );
};

var App = {
    FILE_BASE: 'dados/base-de-dados.txt',
    db: db
};

module.exports = App;