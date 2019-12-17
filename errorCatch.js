// 绑定事件
/**
 * 1. 错误类型
 * * 资源加载错误
 * * 脚本执行错误(语法错误, 类型错误, 未捕获的promise)
 * * http请求错误
 *
 * 2. 为错误事件分类
 *
 */
export function addEvent(target, type, handler) {
  if (target.addEventListener) {
    target.addEventListener(type, handler, false);
  } else {
    target.attachEvent(
      "on" + type,
      function(event) {
        return handler.call(target, event);
      },
      false
    );
  }
}

import Listener from "../../common/listener";

export default class WindowError extends Listener {
  constructor(ctx) {
    super(window, "error", true);
    this.ctx = ctx;
    this.sender = ctx.sender;
    this.params = ctx.params;
  }

  handler(event) {
    let unloadEvent = this.params.getEvent({
      Event: "httpError"
    });
    unloadEvent.CurrentTime = +new Date();
    let sendMsg = {};
    if (!event.message) {
      if (event.target.currentSrc || event.target.src) {
        let errorMsg = event.target.currentSrc || event.target.src;
        sendMsg = {
          type: "sourceError",
          summary: "sourceError",
          url: event.target.baseURI,
          message: {
            error: "资源加载错误",
            outerHTML: event.target.outerHTML,
            src: errorMsg,
            tagName: event.target.nodeName
          }
        };
      }
    } else {
      sendMsg = {
        type: "jsError",
        summary: event.message.split(":")[0],
        url: event.target.document.URL,
        message: {
          error: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      };
    }
    unloadEvent.ExtraInfo = sendMsg;
    this.params.getHeader();
    this.sender.event({
      header: this.params.header,
      device: this.params.device,
      event: [unloadEvent]
    });
  }
}
