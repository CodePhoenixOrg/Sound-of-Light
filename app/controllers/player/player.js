var solPlayer = sol.createController(sol.main, 'sol.player')
.actions({
    showToken : function() {
        
        var token = TRegistry.item(this.name).token;
        this.getPartialView('token.html', 'showToken', '#token', {'token': token}, function(data) {
            $("#tokenLink").on("click", function() {
                context.showToken();
            });
            
        });
        //TRest.get('/api/token')
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
        $("div[name='draggable']").each(function() {
           var id = $(this).data('draghelperid');
           var index = data.names.indexOf('TitleId');
           var dragValues = TUtils.find(data.values, index, id);

           var dragIndex = $(this).data('draghelperindex');
           var dragTemplate = TPlugin.applyDragHelper(data.templates, dragValues, dragIndex);
           
           $(this).on('click', function() {
               context.pl.addTrack(id)
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
                var path = 'http://media.loc/Music/iTunes/iTunes%20Media/Music' + $(this).data('trackpath');
//                path = path.replace('./Users/David/Music', 'media/music');
                $('#player').html(path);
                $('#audio').attr('src', path);
            });
        });

    }   
    , getUserFavorites : function() {
        this.pl.getFavorites(function(data) {
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
}).onload(function() {
    this.currentUser = 1
    this.pl = new SoundLight.Playlist(this.currentUser)
//    this.coll = new SoundLight.Collection()
    this.pl.afterAddTrack = this.getUserFavorites
    this.pl.afterRemoveTrack = this.getUserFavorites
    this.getUserFavorites()    

    TWebObject.getCSS('css/accordion.css');
    this.getScript('js/accordion.js', function() {

        $('.accordion').multiaccordion({defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick"});
    });
    
    this.showToken();


    this.bindPlayables();
    this.dragAndDrop(gridData);

    var handleDrop = function(e, ui) {
        
        var element = ui.draggable.clone().appendTo($(this));
        element.draggable({
            cancel: 'a.ui-icon', 
            revert: 'invalid', 
            containment: '#dropper', 
            helper: 'clone',
            cursor: 'move'
        });
        
        var id = ui.draggable.context.dataset.draghelperid;
        context.pl.addTrack(id);
        
    };



    $("#dropper").droppable({
        accept: '#grid div'
        , drop: handleDrop
    });
    
})