var Content = function (container) {
        
    var content = new UI.Div();

    content.setClass('content');    

    var wrapper = new Wrapper();

    wrapper.add( new Article(container) );

    content.add( wrapper );

    // signals.menuItemClicked.add(function (value) {
    //     content.setText(value);
    // });

    return content;
};