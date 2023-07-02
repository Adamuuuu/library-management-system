enum CacheType {
  Local,
  Session,
}

class createCache {
  storage: Storage;
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage;
  }
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  removeCache(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

const localCache = new createCache(CacheType.Local);
const sessionCache = new createCache(CacheType.Session);
export { localCache, sessionCache };
