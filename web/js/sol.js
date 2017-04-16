
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
    this.currentPlaylist = 0;
};

/**
 * Performs a get request on User object and retrieves its properties giving its Id
 * 
 * @returns JSON stream
 */
SoundLight.User.prototype.getInfo = function() {
    Phink.Web.Rest.get('/api/user/' + this.currentUser, function(data) {
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
    Phink.Web.Rest.get('/api/collection', function(data) {
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
    Phink.Web.Rest.get('/api/playlist/' + this.currentUser, function(data) {
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
    Phink.Web.Rest.put('/api/playlist/' + '1', {'track' : trackId}, function(data) {
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
    Phink.Web.Rest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            the.afterRemoveTrack();
        }
    });
};

SoundLight.Playlist.prototype.afterRemoveTrack = function() {}

var sol = null;
var solHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:8000' : 'www.sol.loc';
Phink.DOM.ready(function() {
    sol = TWebApplication.create(solHost, true);
    sol.main = sol.includeView('main');
});