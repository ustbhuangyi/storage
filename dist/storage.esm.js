/**
 * good-storage v1.1.0
 * (c) 2018 ustbhuangyi
 */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 本地存储实现,封装localStorage和sessionStorage
 */
var store = {
  /* eslint-disable no-undef */
  version: '1.1.0',
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
};

var api = {
  set: function set(key, val) {
    if (this.disabled) {
      return;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, serialize(val));
    return val;
  },
  get: function get(key, def) {
    if (this.disabled) {
      return def;
    }
    var val = deserialize(this.storage.getItem(key));
    return val === undefined ? def : val;
  },
  has: function has(key) {
    return this.get(key) !== undefined;
  },
  remove: function remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },
  clear: function clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  },
  getAll: function getAll() {
    if (this.disabled) {
      return null;
    }
    var ret = {};
    this.forEach(function (key, val) {
      ret[key] = val;
    });
    return ret;
  },
  forEach: function forEach(callback) {
    if (this.disabled) {
      return;
    }
    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      callback(key, this.get(key));
    }
  }
};

_extends(store, api);

_extends(store.session, api);

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}

try {
  var testKey = '__storejs__';
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}

export default store;
