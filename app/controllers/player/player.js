var table0 = null;
var solPlayer = sol.createController(sol.main, 'sol.player')
.actions({
    showToken : function() {
        
        solPlayer.getPartialView('token.html', 'showToken', '#token', {}, function(data) {
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
    , refresh : function(user) {

        solPlayer.getJSON('playlist.html'
            , {
                'action': "getData"
            }
            , function (data) {
                table0 = data;
                TList.create().bind('#playlist'
                    , data.playlist.names
                    , data.playlist.values
                    , data.playlist.templates
                    , data.playlist.elements
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
           
//           $(this).on('click', function() {
//               solPlayer.pl.addTrack(id)
//           })

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
}).onload(function() {
    solPlayer = this;
    this.currentUser = 1
    this.pl = new SoundLight.Playlist(this.currentUser)
    this.pl.afterAddTrack = this.refresh
    this.pl.afterRemoveTrack = this.refresh
    
    this.showToken();
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
    
})