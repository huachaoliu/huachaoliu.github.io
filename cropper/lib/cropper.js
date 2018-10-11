import React from 'react';
import classnames from 'classnames';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import { getBase64 } from './utils';
import css from './cropper.less';

const EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

// Feature detection
// https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
let passiveSupported = false;

try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: () => { passiveSupported = true; return true },
  }));
} catch (err) { }

// get selector
const qs = selector => document.querySelector(selector);

// check variable is number
const isNumber = n => typeof n === 'number';

const currentState = {
  imgWidth: 'auto',
  imgHeight: 'auto',
  imgLeft: 0,
  imgTop: 0,
  boxLeft: 0,
  boxTop: 0,
  scale: 1,
  boxScale: 1,
  cutUrl: '',
  maxWidth: 'auto',
  maxHeight: 'auto',
};
class Cropper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...currentState,
      url: EMPTY_GIF,
      boxWidth: props.boxWidth,
      boxHeight: props.boxHeight,
    };
    this.rect = {};
  }

  componentDidMount() {
    const self = this;
    const { file, boxWidth, boxHeight } = this.props;
    const cropper = qs(`.${css.cropper_content}`);
    const rect = cropper.getBoundingClientRect();
    if (file instanceof File && Object.keys(file).length) {
      getBase64(file.originFileObj || file, imageUrl => {
        this.setState({
          url: imageUrl,
        });
        const data = {
          rect,
          boxWidth,
          boxHeight,
          url: imageUrl,
        };
        this._updateImageStyle(data);
      });
    }
    this.rect = rect;
    // box 居中
    this._hanlderBoxStyle({ rect, boxWidth, boxHeight });

    // 缩放
    const options = passiveSupported ? { passive: false } : false;
    window.addEventListener('mousewheel', this._onMouseWheel, options);
    // 如果在这里监听事件，则需要有重会box的方法。
    // document.addEventListener('mousedown', this._docMouseDown, options)
  }

  componentWillUnmount() {
    this.rect = {};
    window.removeEventListener('mousewheel', this._onMouseWheel);
  }

  _hanlderBoxStyle = ({ rect, boxWidth, boxHeight }) => {
    const boxLeft = (rect.width - boxWidth) / 2;
    const boxTop = (rect.height - boxHeight) / 2;

    this.setState({ boxLeft, boxTop });
  }

  _updateImageStyle = ({ rect, boxWidth, boxHeight, url }) => {
    let image = new Image();
    image.src = url;
    image.onload = () => {
      const left = (rect.width - image.width) / 2;
      const top = (rect.height - image.height) / 2;
      this.setState({
        imgWidth: image.width,
        imgHeight: image.height,
        imgLeft: left,
        imgTop: top,
      })
    }
  }

  _onMouseWheel = (e) => {
    // 放大
    const { minScale, maxScale } = this.props;
    let { scale } = this.state;
    if (e.deltaY < 0) {
      scale = (scale * 100 + 1) / 100;
    } else {
      scale = (scale * 100 - 1) / 100;
    }
    if (scale <= minScale || scale >= maxScale) {
      return;
    }
    this.setState({ scale });
  }

  _onMouseDown = (e) => {
    e.preventDefault();
    const { boxWidth, boxHeight, boxLeft, boxTop } = this.state;
    const { pageX, pageY } = e;
    const self = this;
    const disX = pageX - boxLeft;
    const disY = pageY - boxTop;
    const rect = this.rect;
    const options = passiveSupported ? { passive: false } : false;
    document.addEventListener('mousemove', onMouseMove, options);
    document.addEventListener('mouseup', onMouseUp, options);
    function onMouseMove(e) {
      let left = e.pageX - disX;
      let top = e.pageY - disY;
      if (left <= 0) {
        left = 0;
      } else if (left > rect.width - boxWidth) {
        left = rect.width - boxWidth;
      }

      if (top <= 0) {
        top = 0;
      } else if (top > rect.height - boxHeight) {
        top = rect.height - boxHeight;
      }

      self.setState({ boxLeft: left, boxTop: top });
      return false;
    }

    function onMouseUp(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  _cutBoxMouseDown = (key, e) => {
    e.preventDefault();
    let { boxScale, boxWidth, boxHeight, boxLeft, boxTop } = this.state;
    let { boxWidth: bw, boxHeight: bh } = this.props;
    const rect = this.rect;
    if (e.currentTarget.className === css.cropper_cut_point) {
      const { pageX, pageY } = e;
      const options = passiveSupported ? { passive: false } : false;
      document.addEventListener('mousemove', onMouseMove, options);
      document.addEventListener('mouseup', onMouseUp, options);
      const self = this;
      let bl = boxLeft;
      let bt = boxTop;

      function onMouseMove(e) {
        let x = e.pageX - pageX;
        let y = e.pageY - pageY;

        let z = (x + y) / 2;

        let w = 0,
          h = 0,
          l = boxLeft,
          t = boxTop;
        let moved = true;
        const disx = boxWidth - bw;

        if (key === 1) {
          l += z;
          t += z;
          if (l < 0 || t < 0) return;
          w = boxWidth - z;
          h = boxHeight - z;

          if (w < bw) {
            w = bw;
            moved = false;
          }

          if (h < bh) {
            h = bh;
            moved = false;
          }

        } else if (key === 2) {
          z = (x - y > 0 || disx > 0) ? (x - y) / 2 : 0;
          w = boxWidth + z;
          h = boxHeight + z;
          t -= z;
          if (t < 0 || l + w > rect.width) return;
          if (w < bw) {
            w = bw;
            moved = false;
          }

          if (h < bh) {
            h = bh;
            moved = false;
          }

        } else if (key === 3) {
          w = boxWidth + z;
          h = boxHeight + z;
          if (l + w > rect.width || t + h > rect.height) return;
          if (w < bw) {
            w = bw;
            moved = false;
          }

          if (h < bh) {
            h = bh;
            moved = false;
          }
        } else if (key === 4) {
          z = (y - x > 0 || disx > 0) ? (y - x) / 2 : 0;
          w = boxWidth + z;
          h = boxHeight + z;
          l -= z;
          if (l < 0 || t + h > rect.height) return;
          if (w < bw) {
            w = bw;
            moved = false;
          }

          if (h < bh) {
            h = bh;
            moved = false;
          }
        }
        if (moved) {
          self.setState({ boxWidth: w, boxHeight: h, boxScale: z, boxLeft: l, boxTop: t });
        }

        return false;
      }

      function onMouseUp(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  }

  _getImageRect = (rect) => {
    const { imgWidth, imgHeight, scale, imgLeft, imgTop, boxLeft, boxTop } = this.state;
    const width = isNumber(imgWidth) ? imgWidth * scale : imgWidth;
    const height = isNumber(imgHeight) ? imgHeight * scale : imgHeight;
    const isScale = scale !== 1;

    const x = isNumber(imgWidth) ? imgWidth * (scale - 1) / 2 : 0;
    const y = isNumber(imgHeight) ? imgHeight * (scale - 1) / 2 : 0;
    const marginLeft = isScale ? imgLeft - x : imgLeft;
    const marginTop = isScale ? imgTop - y : imgTop;

    if (rect) {
      return {
        width: rect.width,
        height: rect.height,
        marginLeft: marginLeft - boxLeft,
        marginTop: marginTop - boxTop,
      };
    }

    return { width, height, marginLeft, marginTop };
  }

  _getBoxStyle = () => {
    const { boxWidth, boxHeight, boxLeft, boxTop, boxScale } = this.state;
    return {
      width: boxWidth,
      height: boxHeight,
      left: boxLeft,
      top: boxTop,
    };
  }

  render() {
    const { wrapperClass, disabledPoint } = this.props;
    const { url } = this.state;
    const imgRect = this._getImageRect();

    return <div className={classnames(css.cropper, {
      [`${wrapperClass}`]: wrapperClass
    })}>
      <div className={css.cropper_content}>
        <div className={css.cropper_source_image}>
          <img src={url} style={imgRect} id="source_image" alt="cropper" />
        </div>
        <div className={css.cropper_filter}></div>

        <div className={css.cropper_cut}
          style={this._getBoxStyle()}
          >
          {!disabledPoint && <span className={css.cropper_cut_point}
            data-key="lt"
            onMouseDown={this._cutBoxMouseDown.bind(this, 1)}
            ></span>
          }
          {!disabledPoint && <span className={css.cropper_cut_point}
            data-key="rt"          
            onMouseDown={this._cutBoxMouseDown.bind(this, 2)}
            ></span>
          }
          {!disabledPoint && <span className={css.cropper_cut_point}
            data-key="rb"            
            onMouseDown={this._cutBoxMouseDown.bind(this, 3)}
            ></span>
          }
          {!disabledPoint && <span className={css.cropper_cut_point}
            data-key="lb"            
            onMouseDown={this._cutBoxMouseDown.bind(this, 4)}
            ></span>
          }
          <div className={css.cropper_cut_box}
            ref={box => this.box = box}
            // style={this._getBoxStyle()}
            >
            <div className={css.cropper_move}
              onMouseDown={this._onMouseDown}
              ></div>
            <div className={css.cut_image}>
              <img
                style={this._getImageRect(imgRect)}
                src={url} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={css.btnGroup}>
        <Button type="primary" onClick={this._onCropper}>确定</Button>
        <Button onClick={this._onCancel}>取消</Button>
      </div>
    </div>
  }

  _dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  _onCropper = () => {
    const { file, uploadCallback } = this.props;
    html2canvas(this.box, {
      allowTait: false,
    }).then(entity => {
      const image = entity.toDataURL();
      const name = file && file.name || 'Cropper Example';
      const { type } = file;
      const newFile = this._dataURLtoFile(image, name);
      this.setState({
        cutUrl: image,
      }, () => {
        uploadCallback(newFile);
      });
    });
  }

  _onCancel = () => {
    this.setState({ ...currentState });
    this.props.onCancel();
  }
}

Cropper.defaultProps = {
  boxWidth: 200,
  boxHeight: 200,
  minScale: .3,
  maxScale: 1.5,
  maxWidth: '100%',
  maxHeight: '100%',
  wrapperClass: '',
  disabledPoint: false,
  uploadCallback: () => null,
};

export default Cropper;