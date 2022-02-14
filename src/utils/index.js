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
 export const formatDate = function(date, separator, isTime) {
	date         = new Date(date);
	const year   = date.getFullYear();
  const month  = date.getMonth() + 1
  const day    = date.getDate();
  const hour   = date.getHours();
  const minute = date.getMinutes();
	const second = date.getSeconds();

	const numberToDecimal = function(item) {
		if (item == null) {
			warn(`numberToDecimal: The item is ${item}`);
			item = '';
		}
		return String(item).padStart(2, '0')
	};

	let dates = [ year, month, day ].map(numberToDecimal);
	let times = [ hour, minute, second ].map(numberToDecimal);

	if (isTime) {
		return dates.join(separator) + ' ' + times.join(':');
	} else {
		return dates.join(separator);
	}
}