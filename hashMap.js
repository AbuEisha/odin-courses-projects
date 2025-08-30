export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    key = typeof key === "string" ? key : JSON.stringify(key);

    let hashCode = 0;
    const primeCode = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeCode * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  resize() {
    let oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    if ((this.size + 1) / this.capacity > this.loadFactor) this.resize();

    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    let mapKeys = [];
    const buckets = this.buckets;
    for (const bucket of buckets) {
      for (const [key, value] of bucket) {
        mapKeys.push(key);
      }
    }
    return mapKeys;
  }

  values() {
    let mapValues = [];
    const buckets = this.buckets;
    for (const bucket of buckets) {
      for (const [key, value] of bucket) {
        mapValues.push(value);
      }
    }
    return mapValues;
  }

  entries() {
    let mapEntries = [];
    const buckets = this.buckets;
    for (const bucket of buckets) {
      for (const [key, value] of bucket) {
        mapEntries.push([key, value]);
      }
    }
    return mapEntries;
  }
}
