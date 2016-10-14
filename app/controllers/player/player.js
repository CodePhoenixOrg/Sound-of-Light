var solPlayer = sol.createController(sol.main, 'sol.player')
.onload(function() {
    this.currentUser = 1
//    this.usr = new SoundLight.User(this.currentUser)
    this.pl = new SoundLight.Playlist(this.currentUser)
    this.coll = new SoundLight.Collection()
    var the = this
    TRegistry.item(this.name).token = this.getToken();

    TWebObject.getCSS('css/accordion.css');
    this.getScript('js/accordion.js', function() {

        $('.accordion').multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
        solPlayer.showToken();
        solPlayer.bindPlayables();
        solPlayer.dragAndDrop(gridData);

        var handleDrop = function(e, ui) {

            var element = ui.draggable.clone().appendTo($(this));
            element.draggable({
                cancel: "a.ui-icon", 
                revert: "invalid", 
                containment: "#dropper", 
                helper: "clone",
                cursor: "move"
            });
        };

        $("#dropper").droppable({
            accept: '#grid div'
            , drop: handleDrop
        });
        the.pl.afterAddTrack = the.getUserFavorites
        the.pl.afterRemoveTrack = the.getUserFavorites
        the.pl.getFavorites()
    });
    
}).actions({
    showToken : function() {
        
        var token = TRegistry.item(this.name).token;

        this.getPartialView('token.html', 'showToken', '#token', {'token': token}, function(data) {
            $("#tokenLink").on("click", function() {
                solPlayer.showToken();
            });
            
        });
        return false;
    }
    , showArtist : function(name) {
        $('#wikipedia').attr('src', 'https://en.wikipedia.org/wiki/' + name);
    }
    , showAlbum : function(name) {
        try {
            this.getJSON('player.html', {'action': 'wikiArtist', 'artist': name}, function(data) {
                if(data.return == 200) {
                    TUtils.html64('#wikipedia', data.view);
                } else {
            	        debugLog(base64_decode(data.view));
                }
            });
        } catch (e) {
            debugLog(e);
        }
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
                //, 'token'
            }
            , function (data) {
                TAccordion.create().bind('#grid', data.grid.names, data.grid.values, data.grid.templates, data.grid.elements);
                $(anchor).html(index);
                $(".accordion").multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
                solPlayer.dragAndDrop(data.grid);
            }
        );

        return false;
    }
    , dragAndDrop : function(data) {
        var the = this
        $("div[name='draggable']").each(function() {
           var id = $(this).data('draghelperid');
           var index = data.names.indexOf('TitleId');
           var dragValues = TUtils.find(data.values, index, id);

           var dragIndex = $(this).data('draghelperindex');
           var dragTemplate = TPlugin.applyDragHelper(data.templates, dragValues, dragIndex);
           
           $(this).on('click', function() {
               the.pl.addTrack(id)
           })

           var dragHelper = function(e) {
              return dragTemplate;
           }               

           $(this).draggable({
                cursor: 'move'
                , containment: 'document'
                , stack: '#grid div'
                , helper: dragHelper
            });
        });
        
    }
    , bindPlayables : function() {
        $("a[name='playable']").each(function() {
            $(this).on('click', function() {
                var path = $(this).data('trackpath');
                path = path.replace('./Users/David/Music', 'media/music');
                $('#player').html(path);
                $('#audio').attr('src', path);
            });
        });

    }   
    , getUserFavorites : function() {
        solPlayer.pl.getFavorites(function(data) {
            var result = '<ol>'
            data = data.playlist
            if(data[0].artist === null && data[0].title === null) {
                result = 'La playlist est vide'
            } else {
                for(var i = 0; i < data.length; i++) {
                    var duration = TUtils.secondsToString(data[i].duration)
                    
                    result += '<li><a href="javascript:solPlayer.pl.removeTrack(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
                }
                result += '</ol>'
            }

            var div = document.getElementById('playlist')
            if(div !== undefined) {
                div.innerHTML = result
            }
        })
    
    }
})