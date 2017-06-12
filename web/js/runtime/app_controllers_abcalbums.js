var solAlbums = sol.createController(sol.main, 'sol.albums')
.actions({
    showPlayerByAlbum : function (letter) {
        this.getView('player.html', 'showPlayerByAlbum', {'letter' : letter}, function(data) {
            $('#homeContent').html(data.view);
        })
    }
})
.onload(function() {
    
});
