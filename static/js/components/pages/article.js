var Article = function (container, files) {

    var signals = container.signals;

    var article = new UI.Div().setClass('article');

    var title = new UI.Div().setClass('title').add(

        new UI.H2().setText(files.title.h2),

        new UI.Div().setClass('type').add(

            new UI.Span().setText(files.title.time),

            new UI.Span().setText(files.title.author),

            new UI.Span().setText(files.title.category)

        )
    );

    var setions = new UI.Div().setClass('label')

    var reg = /http:\/\//ig;

    for (var i = 0, l = files.tags.length; i < l; i++) {

        var tag = new UI.H2().setText(files.tags[i].name);

        for (var j = 0; j < files.tags[i].text.length; j++) {
            var text;
            var txtValue = files.tags[i].text[j];
            if (reg.test(txtValue)) {
                var key = new UI.Span().setText(txtValue.substring(0, txtValue.indexOf('http')));
                var url = new UI.Url(txtValue.substring(txtValue.indexOf('http'))).setTarget('blank');
                text = new UI.Div().setClass('text').add(
                    key,
                    url
                );
            } else {
                text = new UI.Div().setClass('text').setText(files.tags[i].text);
                // text = new UI.Div().setClass('text').add(new UI.P().setText(files.tags[i].text[j]));                                                                   
            }
        }

        setions.add(tag, text);

    }

    var readAll = new UI.Button().setClass('readall').setText(files.button);

    article.add(
        title,
        setions,
        readAll
    );

    return article;

};