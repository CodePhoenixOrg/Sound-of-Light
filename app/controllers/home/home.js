var home = TController.create('home.html')
.onload(function() {
        var origin = this.getOrigin();
        
        TWebObject.getCSS('css/accordion.css');
        $.getScript((origin !== undefined) ? origin + '/js/accordion.js' : 'js/accordion.js')
        .done(function( script, textStatus ) {
            $('.accordion').multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
            home.showToken();
            $(".draggable").draggable();
            $(".dropper").droppable();
        })
        .fail(function( jqxhr, settings, exception ) {
            console.log(exception);
        });
    }
).actions({
    showToken : function() {

        this.getPartialView('token.html', 'showToken', '#token', null, function(data) {
            $("#tokenLink").on("click", function() {
                home.showToken();
            });
            
        });
        return false;
    }
    , showArtist : function(id) {
        $("#vikipedia").html("Artist #" + id);
    }
    , showAlbum : function(id) {
        $("#vikipedia").html("Album #" + id);
    }
    , showTitle : function(id) {
        $("#vikipedia").html("Title #" + id);
    }
    , getData : function(count, index, anchor) {

        this.getJSON('grid.html'
            , {
                'action': "getData"
                , 'pagecount': count
                , 'pagenum': index
            }
            , function (data) {
                TAccordion.create().bind('#grid', data.grid.names, data.grid.values, data.grid.templates, data.grid.elements);
                $(anchor).html(index);
                $(".accordion").multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
                
            }
        );

        return false;
    }

});
