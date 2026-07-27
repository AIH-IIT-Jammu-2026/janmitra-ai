import React, { useEffect, useState } from "react";
import offlineSchemes from "../../data/offlineSchemes";
import { saveSchemesOffline } from "../../utils/offlineDb";

/**
 * OfflineBadge
 *
 * - Shows a small "Offline Mode Active" badge whenever the browser
 *   loses its network connection.
 * - While online, it silently caches the top 20 schemes into
 *   IndexedDB/localStorage so they're available if the connection drops.
 */
export default function OfflineBadge() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Cache the offline scheme dataset as soon as the app loads while online.
    if (navigator.onLine) {
      saveSchemesOffline(offlineSchemes).catch((err) =>
        console.error("Scheme caching failed:", err)
      );
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      // Re-cache in case the schemes list changed since the app loaded.
      saveSchemesOffline(offlineSchemes).catch((err) =>
        console.error("Scheme caching failed:", err)
      );
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        background: "#B45309",
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
        }}
      />
      🔌 Offline Mode Active — showing cached schemes
    </div>
  );
}