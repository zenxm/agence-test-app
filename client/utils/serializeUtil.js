export function getQueryParam(data) {
  if (typeof data !== 'object') {
    return `?${data}`;
  }
  const str = [];
  for (const p in data) {
    if (data[p] && data.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(data[p])}`);
    }
  }
  return `?${str.join('&')}`;
}

export function getPathParam(...args) {
  const params = [];

  for (const a in args) {
    params.push(args[a]);
  }
  return params.join('/');
}
