var Button = window.Button || (function () {

  var Button = function (master, opts, type, txt) {
    this.master = master;
    this.type = type;
    this.txt = txt;
    this.btn = this.master.gd('button');
    this.opts = opts || {};
    this.actived = false;
    this.clickEvtFlag = true;
    this.mouseUpEvtFlag = true;
    this.listeners = [];
    this.eventHandler();
    this.init();
    return this.btn;
  }

  Button.prototype.eventHandler = function () {
    var self = this;
    for (var i = 0; i < this.listeners.length; i++) {
      var listen = this.listeners[i];
      if (listen.evt === 'mouseup') {
        this.mouseUpEvtFlag = false;
      }
      if (listen.evt === 'click') {
        this.clickEvtFlag = false;
      }
    }

    if (this.clickEvtFlag) {
      this.master.addEvent(this.btn, 'click', clink);
    }

    if (this.mouseUpEvtFlag) {
      this.master.addEvent(this.btn, 'mouseup', mouseup);
    }

    function clink() {
      if (!self.actived) {
        self.listeners.push({ evt: 'click' });
        self.actived = true;
        //TODO this.opts.operated();
        var events = self.opts.events || [];
        events.map(ev => {
          if (ev.type === 'click') {
            ev.handler();
          }
        });
        // console.count("执行操作...");
        setTimeout(function () {
          self.actived = false;
        }, 500);
      } else {
        // console.count("限制中...");
        self.actived = false;
      }
    }

    function mouseup() {
      self.listeners.push({ evt: 'mouseup' });
      if (!self.actived) {
        var linkCls = self.getSourceByType().linkCls;
        self.btn.classList.add(linkCls);
        setTimeout(function () {
          self.btn.classList.remove(linkCls);
        }, 300);
      }
    }
  }

  Button.prototype.getSourceByType = function () {
    var cls = 'ui-btn';
    var txt = 'default';
    var linkCls = 'ui-btn-default-linked';
    switch (this.type) {
      case 'primary':
        cls += ' ui-btn-primary';
        linkCls = 'ui-btn-primary-linked';
        txt = 'primary';
        break;
      case 'danger':
        cls += ' ui-btn-danger';
        linkCls = 'ui-btn-danger-linked';
        txt = 'danger';
        break;
      case 'dashed':
        cls += ' ui-btn-dashed';
        linkCls = 'ui-btn-dashed-linked';
        txt = 'dashed';
        break;
      case 'disabled':
        cls += ' ui-btn-disabled';
        linkCls = 'ui-btn-disabled-linked';
        txt = 'disabled';
        break;
    }
    return {
      cls,
      txt,
      linkCls,
    };
  }
  var pxsfx = ['width', 'height', 'left', 'top'];
  Button.prototype.init = function () {
    var props = this.getSourceByType();
    this.btn.className = props.cls;
    var styles = this.opts.styles || {};
    var span = this.master.gd('span');
    for (var p in styles) {
      var px = pxsfx.indexOf(p) > -1 ? 'px' : '';
      this.btn.style[p] = styles[p] + px;
    }
    span.textContent = this.txt || props.txt;
    if (this.type === 'disabled') {
      this.btn.disabled = true;
    }
    this.btn.appendChild(span);
  }

  return Button;

} ());


var ButtonGroup = window.ButtonGroup || (function () {

  var ButtonGroup = function (master, opts, type) {
    this.master = master;
    this.btnGroup = this.master.gd();
    this.opts = opts || {};
    this.type = type;
    this.init();

    return this.btnGroup;
  }

  ButtonGroup.prototype.init = function () {
    var props = this.opts.props || [{ txt: '一个按钮' }];
    this.btnGroup.className = 'ui-btn-group';
    var len = props.length;
    for (var i = 0; i < len; i++) {
      var btn = new Button(this.master, props[i], this.type, props[i].txt);
      if (len === 1) {
        btn.classList.add('ui-btn-single');
      }
      this.btnGroup.appendChild(btn);
    }
  }

  return ButtonGroup;
} ());