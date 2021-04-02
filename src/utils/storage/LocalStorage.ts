interface Iterator<T> {
  (value: T, key: string, index: number): void;
}

export class LocalStorage {
  private static instance: LocalStorage;

  public storage: Storage;

  constructor() {
    if (!window.localStorage) {
      throw new Error('`localStorage` API is not supported');
    }
    this.storage = window.localStorage;
  }

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  private serialize<T = unknown>(value: T) {
    return JSON.stringify(value);
  }

  private deserialize(value: string | null) {
    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch (e) {
      return value || undefined;
    }
  }

  public set<T = unknown>(key: string, value?: T) {
    if (value === undefined) {
      this.remove(key);
    } else {
      this.storage.setItem(key, this.serialize(value));
    }
    return value;
  }

  public get<T>(key: string): T {
    const result = this.deserialize(this.storage.getItem(key));
    return result ?? undefined;
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public has(key: string) {
    return this.get(key) !== undefined;
  }

  public clear() {
    this.storage.clear();
  }

  public getAll() {
    let result: Record<string, unknown> = {};
    this.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  public forEach<T = unknown>(iterator: Iterator<T>) {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        iterator(this.get(key), key, i);
      }
    }
  }
}
