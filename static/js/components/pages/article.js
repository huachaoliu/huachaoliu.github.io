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

    for (var i = 0, l = files.tags.length; i < l; i++) {

        var tag = new UI.H2().setText(files.tags[i].name);

        var text = new UI.Div().setClass('text').setText(files.tags[i].text);

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