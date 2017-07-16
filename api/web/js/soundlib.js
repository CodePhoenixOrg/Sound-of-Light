var SoundLib = function () {}

SoundLib.User = function (userId) {
    this.currentUser = userId
}

SoundLib.Collection = function () {}

SoundLib.Playlist = function (userId) {
    this.currentUser = userId
    this.cuurentPlaylist = 1
}


/**
 * Performs a get request on User object and retrieves its properties giving its Id
 * 
 * @returns JSON stream
 */
SoundLib.User.prototype.getInfo = function () {
    Phink.Web.Rest.get('/api/user/' + this.currentUser, function (data) {
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
    })
}

/**
 * Performs a get request on collection object and retrieves all the tracks
 * 
 * @returns JSON stream
 */
SoundLib.Collection.prototype.fetch = function (callback) {
    Phink.Web.Rest.get('/api/collection', function (data) {
        if (typeof callback === 'function') {
            callback.call(this, data)
        }
    })

}

/**
 * Performs a get request on user's playlist and retrieves all its tracks giving the userId
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.getFavorites = function (callback) {
    var the = this
    Phink.Web.Rest.get('/api/playlist/' + this.currentUser, function (data) {
        if (typeof callback === 'function') {
            the.currentPlaylist = data.pid
            callback.call(this, data)
        }
    })

}

/**
 * Performs a put request on user's playlist to add title chosen in the collection by its Id collection
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.addTrack = function (trackId) {
    var the = this
    Phink.Web.Rest.put('/api/playlist/' + this.currentPlaylist, {
        'playlist': this.cuurentPlaylist,
        'track': trackId
    }, function (data) {
        if (data.inserted == 1) {
            the.afterAddTrack()
        }
    })
}

SoundLib.Playlist.prototype.afterAddTrack = function () {}
/**
 * Performs a delete request on user's playlist to remove a title giving its Id in playlist
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.removeTrack = function (trackId) {
    var the = this
    Phink.Web.Rest.delete('/api/playlist/' + trackId, function (data) {
        if (data.deleted == 1) {
            the.afterRemoveTrack()
        }
    })
}

SoundLib.Playlist.prototype.afterRemoveTrack = function () {}