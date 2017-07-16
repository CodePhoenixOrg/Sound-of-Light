'use strict';

let Controller = require(global.PHINK_ROOT + 'mvc/controller');

class Index extends Controller {
    constructor(parent, viewName) {
        super(parent, viewName);

        this._banner = "SoundLib";
        this._collection = "";
        this._userid = 0;
    }

    get collection () {
        return this._collection;
    }

    get userId () {
        return this._userid;
    }

    get banner () {
        return this._banner;
    }

    load(callback) {

        let coll = require(global.APP_MODELS + 'collection');
        let the = this;
        coll.getAllTracks(function (data) {

            let result = '<ol>';
            data = data.collection;

            for (let i = 0; i < data.length; i++) {
                let duration = data[i].duration;

                let minutes = Math.floor(duration / 60);
                let seconds = duration - (minutes * 60);
                duration = minutes + ':' + ('00' + seconds).toString().slice(-2);

                result += '<li><a href="javascript:pl.addTrack(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')' + '</li>';
            }
            result += '</ol>';

            the._collection = result;

            the._userid = 1;

            callback(true);
        })

    }
}

module.exports = Index;
