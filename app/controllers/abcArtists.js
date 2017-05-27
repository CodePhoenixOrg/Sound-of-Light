var solArtists = sol.createController(sol.main, 'sol.artists')
.actions({
    showPlayerByArtist : function (letter) {
        this.getView('player.html', 'showPlayerByArtist', {'letter' : letter}, function(data) {
            $('#homeContent').html(data.view);
        })
    }
})
.onload(function() {
    
});