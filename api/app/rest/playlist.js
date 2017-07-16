'use strict';
var pl = require(global.APP_MODELS + 'playlist');

var instance = null;

// Playlist
var Playlist = function() {
    this._playlistId = 1;
    this._trackId = 1666;
}

Playlist.prototype.playlist = function(playlistId) {
    if(playlistId === undefined) {
        return this._playlistId;
    }
    this._playlistId = playlistId;
}

// TrackId
Playlist.prototype.track = function(trackId) {
    if(trackId === undefined) {
        return this._trackId;
    }
    this._trackId = trackId;
}

Playlist.getInstance = function() {
    if(instance === null) {
        instance = new Playlist();
    }

    return instance;
}

Playlist.playlist = function(playlistId) {
    return Playlist.getInstance().playlist(playlistId);
}

Playlist.track = function(trackId) {
    return Playlist.getInstance().track(trackId);
}

// Get
Playlist.get = function(callback) {
    var userId = 1;
    pl.getUserFavorites(userId, function(data) {
        callback(data);
    });
}

// Put
Playlist.put = function(callback) {
    pl.addTrack(Playlist.playlist(), Playlist.track(), function(data) {
        callback(data);
    });
}

Playlist.delete = function(callback) {
    pl.removeTrack(Playlist.track(), function(data) {
        callback(data);
    });
}

module.exports = Playlist;