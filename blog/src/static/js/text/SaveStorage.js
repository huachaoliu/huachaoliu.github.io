var SaveStorage = function (name) {

    var storage = {
        'history': false
    };

    if (window.localStorage[name] === undefined) {

        window.localStorage[name] = JSON.stringify(name);

    } else {

        var data = JSON.parse(window.localStorage[name]);

        for (var key in data) {
            storage[key] = data[key];
        }

    }

    return {

        getKey: function (key) {
            return storage[key];
        },

        setKey: function () { //key, value, ...

            for (var i = 0; i < arguments.length; i++) {

                storage[arguments[i]] = arguments[i + 1];

            }

            window.localStorage[name] = JSON.stringify[storage];

            console.log('[' + /\d\d\:\d\d:\d\d/.exec(new Date)[0] + ']', 'Save storage sucess');

        },

        clear: function () {

            delete window.localStorage[name];

        }

    }

};