var solDates = sol.createController(sol.main, 'sol.dates')
.onload(function() {
    
}
).actions({
    showPlayerByDate : function (year) {
        this.getView('player.html', 'showPlayerByDate', {'year' : year}, function(data) {
            $('#homeContent').html(data.view);
        })
    }
});