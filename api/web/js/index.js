var helloWorld = Phink.Web.Application.create('http://helloworld-dpjb78860620.codeanyapp.com:1234');
helloWorld.main = helloWorld.createView('main');
var usr = null;
var pl = null;
var coll = null;

var helloMain = helloWorld.createController(helloWorld.main, 'helloWorld.main')
    .actions({
        getCollection: function () {
            coll.fetch(function (data) {
                var result = '<ol>';
                data = data.collection;

                for (var i = 0; i < data.length; i++) {
                    var duration = data[i].duration;

                    var minutes = Math.floor(duration / 60);
                    var seconds = duration - (minutes * 60);
                    duration = minutes + ':' + ('00' + seconds).toString().slice(-2);

                    result += '<li><a href="javascript:pl.addTrack(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')' + '</li>';
                }
                result += '</ol>';

                var div = document.getElementById('collection');
                if (div !== undefined) {
                    div.innerHTML = result;
                }
            })

        },
        getUserFavorites: function () {
            pl.getFavorites(function (data) {
                var result = '<ol>';
                data = data.playlist;

                if (data[0].artist === null && data[0].title === null) {
                    result = 'La playlist est vide';
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var duration = data[i].duration;

                        var minutes = Math.floor(duration / 60);
                        var seconds = duration - (minutes * 60);
                        duration = minutes + ':' + ('00' + seconds).toString().slice(-2);

                        result += '<li><a href="javascript:pl.removeTrack(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')' + '</li>';
                    }
                    result += '</ol>';
                }

                var div = document.getElementById('playlist');
                if (div !== undefined) {
                    div.innerHTML = result;
                }
            })

        }
    })
    .onload(function () {
        helloMain = this;

        var currentUser = 1;
        usr = new SoundLib.User(currentUser);
        pl = new SoundLib.Playlist(currentUser);
        coll = new SoundLib.Collection();

        pl.afterAddTrack = this.getUserFavorites;
        pl.afterRemoveTrack = this.getUserFavorites;

        usr.getInfo();
        // this.getCollection()
        this.getUserFavorites();


    });