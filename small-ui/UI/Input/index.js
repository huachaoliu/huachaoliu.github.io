var Input = window.Input || (function () {

  var Input = function (master, options, type) {

    this.master = master;
    this.input = master.gd('span');
    this.afterTk = master.gd('span');
    
    this.props = options;
    this.type = type;
    this.init();
    return this.input;
  }

  Input.prototype.typeMap = function () {
    var cls = 'ui-input';
    var txt = 'default';
    switch(this.type) {
      case 'primary':

    }
  }

  Input.prototype.init = function () {
    var 
  }

  return Input;

} ());