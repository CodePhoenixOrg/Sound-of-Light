'use strict';

var port = process.env.PORT || 1234;
var app = require('../bower_components/phinkjs/web/web_application');

app.create('http://sample.loc', port, function (req, res, data) {
    // console.log(req.headers);
    
    if (data.mimetype !== 'image/vnd.microsoft.icon') {
        //console.log('received data: ' + data.stream);
    }

});