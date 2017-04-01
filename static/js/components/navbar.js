var Navbar = function (container) {
    var navbar = new UI.Div();
    navbar.setClass('navbar');

    var wrapper = new Wrapper();

    wrapper.add(new Navigation(container));
    wrapper.add(new Menubar(container, 5));

    navbar.add(wrapper);

    return navbar;
};