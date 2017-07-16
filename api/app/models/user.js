'use strict';
var User = function () {};

//put your code here
User.getInfo = function (userId, callback)
{
    var result = {};
    result.info = [];
    
    var mysql = require('mysql');
    var conf = require(APP_DATA + 'configuration');
    var stmt = mysql.createConnection(conf.parameters);

    var sql = " \
select usr_id as id, usr_name as name, usr_email as email \
from user \
where usr_id = ? \
";

    stmt.connect();
    stmt.query(sql, [userId], function(err, rows, fields) {
      
      rows.forEach(function(element) {
        result.info.push(element);
      })

      callback(result);
        
    });
    stmt.end();

}

console.log(__filename);

module.exports = User;