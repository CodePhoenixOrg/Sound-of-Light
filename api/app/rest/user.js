'use strict';
var usr = require(APP_MODELS + 'user');

var User = function() {};

//put your code here
User.get = function(callback) {
    var userId = 1;
    
    usr.getInfo(userId, function(data) {
        callback(data);
    });    
};

module.exports = User;