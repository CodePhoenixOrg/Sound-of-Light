'use strict';
var Collection = function() {};

//put your code here
Collection.getAllTracks = function(callback) {
    var result = {};
    result.collection = [];
  
    var mysql = require('mysql');
    var conf = require(global.APP_DATA + 'configuration');
    var stmt = mysql.createConnection(conf.parameters);

    var sql = "\
select trk_id as id, art_name as artist, trk_title as title, trk_duration as duration \
from artist a \
inner join track t on a.art_id = t.art_id \
order by art_name, trk_title \
limit 0, 25 \
";

    stmt.connect();
    stmt.query(sql, function(err, rows, fields) {
      
      rows.forEach(function(element, i) {
        result.collection.push(element);
      })
      
      callback(result);
        
    });
    stmt.end(); 
    
}

console.log(__filename);

module.exports = Collection;