// 防抖方法

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce1(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

// 防抖方法
export function debounce(func, ...args) {
  let context = this;
  if (this.debounceTimer) clearTimeout(this.debounceTimer);
  let callNow = !this.debounceTimer; //是否立即执行
  this.debounceTimer = setTimeout(() => {
    this.debounceTimer = null;
  }, 400);
  if (callNow) func.apply(context, args);
}
/**
 * 格式化日期
 * 默认格式：YYYY-MM-DD
 */
export const formatDate = function (date, separator, isTime) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const numberToDecimal = function (item) {
    if (item == null) {
      warn(`numberToDecimal: The item is ${item}`);
      item = "";
    }
    return String(item).padStart(2, "0");
  };

  let dates = [year, month, day].map(numberToDecimal);
  let times = [hour, minute, second].map(numberToDecimal);

  if (isTime) {
    return dates.join(separator) + " " + times.join(":");
  } else {
    return dates.join(separator);
  }
};
