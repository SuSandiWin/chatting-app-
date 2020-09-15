var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    port: 3306,
    database: 'mydb',
    dataStrings: 'data',
    multipleStatements: true
});

var getConnection = function(callback){
    pool.getConnection(function(err,connection){
        callback(err,connection);
    });
};

exports.getConnection = getConnection;
/* pool.query('SELECT 1 + 4 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
}); //test connection*/