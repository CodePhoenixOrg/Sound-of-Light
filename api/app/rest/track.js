'use strict';
var tr = require(APP_MODELS + 'track');

var Track = function() {};

//put your code here
Track.prototype.get = function(callback) {
    var trackId = 1666;
    tr.getTrackById(trackId, function(data) {
        callback(data);
    });
}

module.exports = Track;