var solDummy = sol.createController('main', 'dummy')
.actions({
    goHome: function (letter) {
        this.getSimpleView('home.html', function (data) {
            $('#homeContent').html(data.view);
        })
    }
    , play: function (control) {
        var player = document.querySelector('#playerControl');
        var playButton = document.querySelector('#playButton');

        if (player.paused) {
            player.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            
            player.paused = false;
        } else {
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            player.pause();
            
            player.paused = true;
        }
    }
    , resume: function () {
        var player = document.querySelector('#playerControl');

        player.currentTime = 0;
        player.pause();
    }
    , volume: function (vol) {
        var player = document.querySelector('#playerControl');

        player.volume = vol;
    }
    , update: function (player) {
        var duration = player.duration;    // Durée totale
        var time = player.currentTime; // Temps écoulé
        var fraction = time / duration;
        var percent = Math.ceil(fraction * 100);

        var progress = document.querySelector('#progressBar');

        progress.style.width = percent + '%';
        progress.textContent = percent + '%';

        document.querySelector('#progressTime').textContent = solDummy.formatTime(time);
    }
    , formatTime: function (time) {
        var hours = Math.floor(time / 3600);
        var mins = Math.floor((time % 3600) / 60);
        var secs = Math.floor(time % 60);

        if (secs < 10) {
            secs = "0" + secs;
        }

        if (hours) {
            if (mins < 10) {
                mins = "0" + mins;
            }

            return hours + ":" + mins + ":" + secs; // hh:mm:ss
        } else {
            return mins + ":" + secs; // mm:ss
        }
    }
})
.onload(function () {
    solDummy = this;
});