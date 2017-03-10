/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SoundLight = function() {}

SoundLight.User = function(userId) {
    this.currentUser = userId;
};

SoundLight.Collection = function() {};

SoundLight.Playlist = function(userId) {
    this.currentUser = userId;
    this.currentPlaylist = 1;
};

/**
 * Performs a get request on User object and retrieves its properties giving its Id
 * 
 * @returns JSON stream
 */
SoundLight.User.prototype.getInfo = function() {
    TRest.get('/api/user/' + this.currentUser, function(data) {
        var user = data.info[0];
        document.getElementById('name').innerHTML = user.name;
        document.getElementById('email').innerHTML = user.email;
    });
};

/**
 * Performs a get request on collection object and retrieves all the tracks
 * 
 * @returns JSON stream
 */
SoundLight.Collection.prototype.fetch = function(callback) {
    TRest.get('/api/collection', function(data) {
        if(typeof callback === 'function') {
            callback.call(this, data);
        }
    });
    
};

/**
 * Performs a get request on user's playlist and retrieves all its tracks giving the userId
 * 
 * @returns JSON stream
 */
SoundLight.Playlist.prototype.getFavorites = function(callback) {
    var the = this;
    TRest.get('/api/playlist/' + this.currentUser, function(data) {
        if(typeof callback === 'function') {
            the.currentPlaylist = data.pid;
            callback.call(this, data);
        }
    });
    
};

/**
 * Performs a put request on user's playlist to add title chosen in the collection by its Id collection
 * 
 * @returns JSON stream
 */
SoundLight.Playlist.prototype.addTrack = function(trackId) {
    var the = this;
    TRest.put('/api/playlist/' + this.currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            the.afterAddTrack();
        }
    });
};

SoundLight.Playlist.prototype.afterAddTrack = function() {}
/**
 * Performs a delete request on user's playlist to remove a title giving its Id in playlist
 * 
 * @returns JSON stream
 */
SoundLight.Playlist.prototype.removeTrack = function(trackId) {
    var the = this;
    TRest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            the.afterRemoveTrack();
        }
    });
};

SoundLight.Playlist.prototype.afterRemoveTrack = function() {}
