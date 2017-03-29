/**
 * @author: misliu
 * @desc ui - a build ui component;
*/

(function () {
    /**
     * @param: {UI} UI - 顶层对象,继承多个对象的属性;
    */
    var UI = {};
    /**
     * @param: {UI-Element} UI-Element UI DOM public method 
    */
    UI.Element = function (dom) {
        this.dom = dom;
    };

    UI.Element.prototype = {

        setClass: function (name) {
        
            this.dom.className = name;
        
            return this;
        
        },
        
        setId: function (id) {
        
            this.dom.id = id;
        
            return this;
            
        }
    };


    UI.Div = function () {

        UI.Element.call(this);

        this.dom = document.createElement('div');

        return this;

    };

    UI.Div.prototype = Object.create(UI.Element.prototype);
    UI.Div.prototype.constructor = UI.Div;

    window.UI = UI;

})();