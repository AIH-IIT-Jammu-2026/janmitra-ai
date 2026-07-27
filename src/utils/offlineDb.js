// Small IndexedDB wrapper for caching the top 20 emergency & welfare
// schemes so they're available even when the device is offline.
// Falls back to localStorage if IndexedDB isn't available for some reason.

const DB_NAME = "janmitra-offline-db";
const DB_VERSION = 1;
const STORE_NAME = "schemes";
const LOCALSTORAGE_KEY = "janmitra_offline_schemes";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

/**
 * Save an array of scheme objects (each must have a unique `id`) for offline use.
 */
export async function saveSchemesOffline(schemes) {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      schemes.forEach((scheme) => store.put(scheme));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    // Fallback: localStorage (works everywhere, simpler, no querying needed)
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(schemes));
      return true;
    } catch (lsErr) {
      console.error("Failed to cache schemes offline:", lsErr);
      return false;
    }
  }
}

/**
 * Retrieve all cached schemes. Returns an empty array if none are cached yet.
 */
export async function getSchemesOffline() {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (lsErr) {
      console.error("Failed to read cached schemes:", lsErr);
      return [];
    }
  }
}

/**
 * Very simple keyword search over cached schemes — used as an offline
 * fallback when the live backend/Gemini call fails and the user is offline.
 */
export function searchCachedSchemes(schemes, query) {
  const q = query.toLowerCase();
  return schemes.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}