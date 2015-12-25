var home = (new TController()).actions({
    oninit : function() {

    }
    , onload : function() {
        var origin = TRegistry.item('home').origin + '/';
        
        $.jPhoenix.getCSS(origin + "css/accordion.css");
        $.getScript(origin + "js/accordion.js")
        .done(function( script, textStatus ) {
            $(".accordion").multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
            home.showToken();
            $("#tokenLink").on("click", function() {
                alert("Hello !");
                home.showToken();
            });
        })
        .fail(function( jqxhr, settings, exception ) {
            console.log(exception);
        });
    }
    , showToken : function() {
        this.getPartialView('token.html', 'showToken', '#token');
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
        $.jPhoenix.getJSON('grid.html'
            , {
                'action': "getData"
                , 'pagecount': count
                , 'pagenum': index
            }
            , function (data) {
                $.jPhoenix.bindTable('#grid', data.grid.values, data.grid.templates);
                $(anchor).html(index);
            }
        );

        return false;
    }

});

//home.showToken();
//$(document).ready(function () {
//    $.jPhoenix.getCSS("/css/accordion.css");
//    $.getScript("/js/accordion.js")
//    .done(function( script, textStatus ) {
//        $(".accordion").multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
//    })
//    .fail(function( jqxhr, settings, exception ) {
//        console.log(exception);
//    });
//    showToken();
//});