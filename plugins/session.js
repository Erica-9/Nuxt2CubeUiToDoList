export default ({ app }, inject) => {
  inject("session", {
    // 設定 key
    set(key = "", val = {}) {
      sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 取得 key
    get(key = "") {
      const obj = JSON.parse(sessionStorage.getItem(key));
      if (!obj) return {};
      return obj;
    },
    // 移除 key
    remove(key = "") {
      sessionStorage.removeItem(key);
    },
    // 移除所有 key
    removeAll() {
      sessionStorage.clear();
    },
  });
};
