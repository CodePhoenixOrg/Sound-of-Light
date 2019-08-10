sol.createView('player')
var solPlayer = sol.createController('player', 'player')
    .actions({
        showAlbumNew: function (name) {
            $('#wikipedia').attr('src', 'https://media.loc/main.html?artist=' + name);
        }
        , showAlbum: function (name) {
            name = encodeURIComponent(name);
            this.getJSON('player.html', { 'action': 'wikiArtist', 'artist': name }, function (data) {
                if (data.return == 200) {
                    Phink.Utils.html64('#wikipedia', data.view);
                } else {
                    debugLog(base64_decode(data.view));
                }
            });
        }
        , refresh: function (user) {

            solPlayer.getJSON('playlist.html'
                , {
                    'action': "getData"
                }
                , function (data) {
                    Phink.Web.UI.List.create().bind('#playlist'
                        , data.playlist
                        , function () {
                            solPlayer.bindPlayables();
                        }
                    );

                }
            );

            return false;
        }
        , dragAndDrop: function (data) {
            // $("div[name='draggable']").each(function() {
            //    var id = $(this).data('draghelperid');
            //    var index = data.names.indexOf('TitleId');
            //    var dragValues = Phink.Utils.find(data.values, index, id);

            //    var dragIndex = $(this).data('draghelperindex');
            //    var dragTemplate = Phink.Web.UI.Plugin.applyDragHelper(data.templates, dragValues, dragIndex);

            //    var dragHelper = function(e) {
            //       return dragTemplate;
            //    }               

            //    $(this).draggable({
            //         cursor: 'move'
            //         , containment: 'document'
            //         , stack: '#collection div'
            //         , helper: dragHelper
            //     });
            // });

        }
        , bindPlayables: function () {
            $("a[name='playable']").each(function () {
                $(this).on('click', function () {
                    //iTunes
                    // var path = 'https://media.loc/Music/iTunes/iTunes%20Media/Music' + $(this).data('trackpath');
                    //OneDrive
                    var path = 'https://media.loc/Musique' + $(this).data('trackpath');
                    path = path.replace('./Users/David/Music', '');
                    $('#player').html(path);
                    $('#playerControl').attr('src', path);
                });
            });

        }
    }).onload(function () {
        solPlayer = this;
        this.currentUser = 1;
        this.pl = new SoundLight.Playlist(this.currentUser);
        this.pl.afterAddTrack = this.refresh;
        this.pl.afterRemoveTrack = this.refresh;

        this.bindPlayables();
        // this.dragAndDrop(collectionData);

        // var handleDrop = function(e, ui) {

        //     var element = ui.draggable.clone().appendTo($(this));
        //     element.draggable({
        //         cancel: 'a.ui-icon', 
        //         revert: 'invalid', 
        //         containment: '#dropper', 
        //         helper: 'clone',
        //         cursor: 'move'
        //     });

        //     var id = ui.draggable.context.dataset.draghelperid;
        //     solPlayer.pl.addTrack(id);

        // };

        // $("#dropper").droppable({
        //     accept: '#collection div'
        //     , drop: handleDrop
        // });

    });