export default ({ app }, inject) => {
  inject("localStorage", {
    // 設定 key
    set(key = "", val = {}) {
      localStorage.setItem(key, JSON.stringify(val));
    },
    // 取得 key
    get(key = "") {
      const obj = JSON.parse(localStorage.getItem(key));
      if (!obj) return {};
      return obj;
    },
    // 移除 key
    remove(key = "") {
      localStorage.removeItem(key);
    },
    // 移除所有 key
    removeAll() {
      localStorage.clear();
    },
  });
};
