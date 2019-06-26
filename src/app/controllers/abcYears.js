var solDates = sol.createController('main', 'years')
.actions({
    showPlayerByDate : function (year) {
        this.getView('player.html', 'showPlayerByDate', {'year' : year}, function(data) {
            $('#homeContent').html(data.view);
        })
    }
})
.onload(function() {
    
});
