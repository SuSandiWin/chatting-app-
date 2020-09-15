var db = require('../db');

exports.user_signup = function(user,cb){
    var md5= require('md5');
    // var str = "INSERT INTO users (name,email,password) VALUES ('"+user.name+"','"+user.email+"','"+md5(user.password)+"')";   
    var str = "INSERT INTO users (name,email,password) VALUES ? ";   
    var ind = [[user.name,user.email,md5(user.password)]];
    db.getConnection(function(err,connection){
        connection.query(str,[ind],function(err,results){
            connection.release();
            if(!err){
                cb(null, user.name);   
                var iI = results.insertId;
            }else{
                cb(err);
            }
        });
    });
}
exports.login_user = function(user,cb) {
    var md5 = require('md5');
    var str = "SELECT * FROM users WHERE name =? AND password =?";
		db.getConnection(function(err, connection){
            var username = user.name;
            var password = md5(user.password);
            if (username && password) {
                connection.query(str, [username, password], function(error, results) {             
                    if (results.length > 0) {
                        cb(null, user.name,results[0].id);
                    } else {
                       cb(null,"error");
                    }			
                });
            }
            connection.release();
    });
}

exports.list = function(cb) {
	var str = "SELECT * FROM users ORDER BY name";	
	db.getConnection(function(err, connection){
		connection.query(str, function(err, result){
			connection.release();
			if(!err){				
				cb(null, result);
			}else{
				cb(err);
			}
		});
	});
}

//test
/*  var gettingfromId =function(user,cb){
    var str = "SELECT id FROM users WHERE name=?";
    var c= db.getConnection(function(err,connection){
        connection.query(str,[user.name],function(err,data){
            connection.release();
            if(!err){
                console.log(c);
            }
        })
    })
}
gettingfromId(); */
exports.test = function(fI,tI){
    var str = "SELECT name FROM users WHERE id= ?";
    db.getConnection(function(err,connection){
        connection.query(str,[tI],function(err,data){
            connection.release();
            if(!err){
                console.log(data[0].name);
            }
        })
    })
}

exports.gettingtoId =function(user,cb){
    var str = "SELECT id FROM users WHERE name=?";
    db.getConnection(function(err,connection){
        connection.query(str,[user.name],function(err,data){
            connection.release();

        })
    })
}
exports.dBstore = function(user,cb){
    var str = "INSERT INTO message (fromId,toId,message) VALUES ('"+user.fromId+"','"+user.toId+"','"+user.message+"')";
    db.getConnection(function(err,connection){
        connection.query(str,function(err,data){
            connection.release();
            if(!err){
                cb(null, "success");
            }
        })
    })
}
exports.showing = function(fI,cb){
    var a = fI;
    // var b = user.toId;

    var str = "SELECT message FROM message WHERE (fromId=? OR fromId=?) AND (toId=? OR toId=?)";
    db.getConnection(str,[[a,b],[a,b]],function(err,data){
        connection.release();
        if(!err){
            cb(null,"success");
        }
    })
}
