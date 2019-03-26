'use strict';
var pl = require(global.APP_MODELS + 'playlist');

var the = null;

// Playlist
var Playlist = function() {
    this._playlistId = 1;
    this._trackId = 1666;
    the = this;
}

Playlist.prototype.playlist = function(playlistId) {
    if(playlistId === undefined) {
        return the._playlistId;
    }
    the._playlistId = playlistId;
}

// TrackId
Playlist.prototype.track = function(trackId) {
    if(trackId === undefined) {
        return the._trackId;
    }
    the._trackId = trackId;
}

// Get
Playlist.prototype.get = function(callback) {
    var userId = 1;
    pl.getUserFavorites(userId, function(data) {
        callback(data);
    });
}

// Put
Playlist.prototype.put = function(callback) {
    pl.addTrack(the._playlistId, the._trackId, function(data) {
        callback(data);
    });
}

Playlist.prototype.delete = function(callback) {
    pl.removeTrack(the._trackId, function(data) {
        callback(data);
    });
}

module.exports = Playlist;