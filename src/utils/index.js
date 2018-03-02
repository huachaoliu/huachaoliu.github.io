const localStorageCache = {};
export function setLocalStorage (key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, value);
  } else {
    localStorageCache[key] = value;
    global.localStorageCache = localStorageCache;
  }
}

export function getLocalStorage(key) {
  if (window.localStorage) {
    return window.localStorage.getItem(key);
  } else {
    return global.localStorageCache[key];
  }
}