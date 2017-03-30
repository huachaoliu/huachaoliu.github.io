function ajaxGet(url, options, callback) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr < 300 || xhr.status === 304) {
                callback(xhr.responseText);
            } else {
                throw new Error("请求失败");
            }
        }
    }

    var seriUrl = url + '?' + serialize(options);
    xhr.open('get', seriUrl, true);
    xhr.send(null);
}

function serialize(data) {
    if (!data) return '';
    var pairs = [], value;
    for (name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}