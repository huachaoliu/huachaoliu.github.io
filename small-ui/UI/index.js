var UI = window.UI || {};

UI.qs = function (selector) {
  return document.querySelector(selector);
}

UI.gd = function (type) {
  type = type || 'div';
  return document.createElement(type);
}

UI.addEvent = function (dom, event, handler, captrue) {
  if (window.addEventListener) {
    dom.addEventListener(event, handler, captrue);
  } else if (window.attachEvent) {
    dom.attachEvent("on" + event, handler);
  }
}

UI.removeEvent = function (dom, event, handler) {
  if (window.removeEventListener) {
    dom.removeEventListener(event, handler);
  } else if (window.detachEvent) {
    dom.detachEvent("on" + event, handler);
  }
}

UI.Button = function (options, type, txt) {
  return new Button(UI, options, type, txt);
}

UI.ButtonGroup = function (options, type) {
  return new ButtonGroup(UI, options, type);
}

UI.Input = function (options, type) {
  return new Input(UI, options, type);
}