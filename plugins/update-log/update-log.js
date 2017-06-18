(function () {

    const logData = log.data;

    function _(className, domType = 'div') {
        let dom = document.createElement(domType);
        dom.className = className;
        return dom;
    }

    function clearRepeat(arr) {

        let result = [];
        for (let i = 0, l = arr.length; i < l; i++) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }

        return result;
    }

    function add(parent, doms) {
        for (let i = 0, l = doms.length; i < l; i++) {
            if (doms[i]) {
                parent.appendChild(doms[i]);
            }
        }
    }

    let boldReg = /\:/
        , urlReg = /https?\:\/\/[\w\-]+(\.[\w\-\@\%\/\&\?]+)(\.[\w\/]+)/;

    function build(target, title) {

        title = title || '更新日志'

        let logTitle = _('title', 'h1');

        logTitle.textContent = title;

        logData.map(data => {

            let items = _('items')
                , date = _('time')
                , line = _('line')
                , value = _('text');

            date.innerHTML = data.date;
            

            data.items.map ( text => {
                let textItem = _('', 'p'),
                     boldPart = _('strong', 'span'),
                     currentPart = _('', 'span'),
                     url = _('', 'a'),
                     str = '';
                if (boldReg.test(text)) {
                    boldPart.textContent = text.substr(0, text.indexOf(':')+1)    ;
                    let notBold = text.substr(text.indexOf(':')+1);
                    if (urlReg.test(notBold)) {
                        str = urlReg.exec(notBold)[0];
                        url.textContent = str;
                        url.href = str;
                        url.setAttribute('target', '_blank');
                        let frondPart = _('', 'span');
                        let endPart = _('', 'span');
                        frondPart.textContent = notBold.substr(0, notBold.indexOf(str[0])+1);
                        endPart.textContent = notBold.substr(notBold.lastIndexOf(str[str.length - 1])+1);                        
                        add(currentPart, [frondPart, url, endPart]);
                    } else {
                        currentPart.textContent = text.substr(text.indexOf(':') + 1);
                    }
                    add(textItem, [boldPart, currentPart])
                } else {
                    boldPart.textContent = text;
                    add(textItem, [boldPart]);
                }

                value.appendChild(textItem);
             })

            add(items, [date, line, value]);
            target.appendChild(items);
        });
    }

    function matchUrl () {
        
    }

    function updateLog(target, title) {
        build(target, title);
    }

    window['updateLog'] = updateLog;

})();