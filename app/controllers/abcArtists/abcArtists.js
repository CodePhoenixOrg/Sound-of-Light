var solHome = sol.createController(sol.main, 'sol.home')
.onload(function() {
    
}
).actions({
    showPlayerByLetter : function (letter) {
        this.getView('player.html', function(data) {
            $('#homeContent').html(data.view);
        })
    }
});