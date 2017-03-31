var Content = function (container) {
        
    var content = new UI.Div();

    content.setClass('content');    

    var wrapper = new Wrapper();

    wrapper.add( new Home(container) );

    content.add( wrapper );

    return content;
};