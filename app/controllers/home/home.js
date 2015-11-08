function showToken() {
    $.jPhoenix.getPartialView('token.html', 'showToken', '#token');
    return false;
}

function showArtist(id) {
    $("#vikipedia").html("Artist #" + id);
}

function showAlbum(id) {
    $("#vikipedia").html("Album #" + id);
}

function showTitle(id) {
    $("#vikipedia").html("Title #" + id);
}

function getData(count, index, anchor) {
    $.jPhoenix.getJSON('grid.html'
        , {
            'action': "getData"
            , 'pagecount': count
            , 'pagenum': index
        }
        , function (data) {
            //$.jPhoenix.bindTable('#grid', data.grid.values, data.grid.templates);
            $.jPhoenix.bindAccordion('#grid', data.grid.names, data.grid.values, data.grid.templates, data.grid.elements);
            $(anchor).html(index);
        }
    );
    
    return false;
}

$(document).ready(function () {
    $.jPhoenix.getCSS("/css/accordion.css");
    $.getScript("/js/accordion.js")
    .done(function( script, textStatus ) {
        $(".accordion").multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
    })
    .fail(function( jqxhr, settings, exception ) {
        console.log(exception);
    });
    showToken();
});
