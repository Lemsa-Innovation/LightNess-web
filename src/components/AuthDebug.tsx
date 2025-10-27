"use client";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useEffect, useState } from "react";

export default function AuthDebug() {
  const { user, isLoading, isAdmin, isSuperAdmin } = useAuth();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logMessage = `[${new Date().toLocaleTimeString()}] Loading: ${isLoading}, User: ${
      user ? user.email : "None"
    }, Role: ${user?.role || "None"}`;
    setLogs((prev) => [...prev.slice(-4), logMessage]);
  }, [isLoading, user]);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "350px",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      <h4>Auth Debug</h4>
      <p>
        <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
      </p>
      <p>
        <strong>User:</strong> {user ? `${user.email} (${user.role})` : "None"}
      </p>
      <p>
        <strong>Is Admin:</strong> {isAdmin ? "Yes" : "No"}
      </p>
      <p>
        <strong>Is Super Admin:</strong> {isSuperAdmin ? "Yes" : "No"}
      </p>

      <details>
        <summary>Recent Logs</summary>
        <div style={{ fontSize: "10px", marginTop: "5px" }}>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: "2px" }}>
              {log}
            </div>
          ))}
        </div>
      </details>

      {user && (
        <details>
          <summary>Full User Data</summary>
          <pre
            style={{ fontSize: "10px", overflow: "auto", maxHeight: "200px" }}
          >
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
