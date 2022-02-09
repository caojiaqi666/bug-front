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
