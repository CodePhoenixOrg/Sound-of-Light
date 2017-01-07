var table0 = null;
var solPlayer = sol.createController(sol.main, 'sol.player')
.actions({
    showAlbumNew : function(name) {
        $('#wikipedia').attr('src', 'http://media.loc/main.html?artist=' + name);
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
    , refresh : function(user) {

        solPlayer.getJSON('playlist.html'
            , {
                'action': "getData"
            }
            , function (data) {
                TList.create().bind('#playlist'
                    , data.playlist
                    , function() {
                        solPlayer.bindPlayables();
                    }
                );

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
           
           var dragHelper = function(e) {
              return dragTemplate;
           }               

           $(this).draggable({
                cursor: 'move'
                , containment: 'document'
                , stack: '#collection div'
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
}).onload(function() {
    solPlayer = this;
    this.currentUser = 1;
    this.pl = new SoundLight.Playlist(this.currentUser);
    this.pl.afterAddTrack = this.refresh;
    this.pl.afterRemoveTrack = this.refresh;
    
    this.bindPlayables();
    this.dragAndDrop(collectionData);

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
        solPlayer.pl.addTrack(id);
        
    };

    $("#dropper").droppable({
        accept: '#collection div'
        , drop: handleDrop
    });
    
});