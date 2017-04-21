var Category = function (container) {

     var signals = container.signals;

     var category = new UI.Div().setClass('category');

     var categoryFile = new CategoryFiles();

     function render() {
        for (var i = 0, l = categoryFile.length; i < l; i++) {

            category.add(new Article(container, categoryFile[i]));

        }
    }
    render();

     return category;
};