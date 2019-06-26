var solArtists = sol.createController('main', 'artists')
.actions({
    showPlayerByArtist : function (letter) {
        this.getView('player.html', 'showPlayerByArtist', {'letter' : letter}, function(data) {
            $('#homeContent').html(data.view);
        })
    }
})
.onload(function() {
    
});