"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSupabaseUsers } from "@/hooks/useSupabaseUsers";
import { useSupabaseAuth } from "@/hooks/useAuth";
import AuthDebug from "@/components/AuthDebug";
import { withRetry } from "@/utils/supabase/retry";

export default function TestSupabase() {
  const [status, setStatus] = useState<string>("Ready to test");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState("fodil135@gmail.com");
  const [testPassword, setTestPassword] = useState("fodil135@gmail.com");

  // Test the useSupabaseUsers hook - RE-ENABLED AFTER FIXING DEADLOCK
  const {
    users: hookUsers,
    isLoading: hookLoading,
    error: hookError,
  } = useSupabaseUsers();

  // Test auth functionality
  const { signIn, signOut } = useSupabaseAuth();

  const testConnection = async () => {
    setLoading(true);
    setStatus("Testing connection...");

    try {
      const supabase = createClient();

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Connection timeout after 5 seconds")),
          5000
        );
      });

      const connectionPromise = supabase.from("users").select("count").limit(1);

      const { data, error } = (await Promise.race([
        connectionPromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("✅ Connection successful!");

        // Test fetching users with timeout
        const usersPromise = supabase
          .from("users")
          .select("id, email, first_name, last_name")
          .limit(5);

        const { data: usersData, error: usersError } = (await Promise.race([
          usersPromise,
          timeoutPromise,
        ])) as any;

        if (usersError) {
          setStatus(`✅ Connection OK, but users error: ${usersError.message}`);
        } else {
          setStatus(`✅ Connection OK! Found ${usersData?.length || 0} users`);
          setUsers(usersData || []);
        }
      }
    } catch (err) {
      setStatus(
        `❌ Exception: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const testEnvironment = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    setStatus(`Environment Check:
    URL: ${url ? "✅ Set" : "❌ Missing"}
    Key: ${key ? "✅ Set" : "❌ Missing"}
    URL Value: ${url || "NOT_SET"}
    Key Length: ${key ? key.length : 0} characters`);
  };

  const testClientCreation = () => {
    try {
      const supabase = createClient();
      setStatus("✅ Supabase client created successfully!");
    } catch (err) {
      setStatus(
        `❌ Client creation failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const testAuthOnly = async () => {
    setLoading(true);
    setStatus("Testing auth only (no database)...");

    try {
      const supabase = createClient();

      // Test auth without database access
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setStatus(`Auth test result: ${error.message}`);
      } else {
        setStatus(
          `Auth test: ${
            user ? `User found: ${user.email}` : "No user logged in"
          }`
        );
      }
    } catch (err) {
      setStatus(
        `Auth test error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const testGetUsers = async () => {
    setLoading(true);
    setStatus("Testing get users directly...");

    try {
      const supabase = createClient();

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Get users timeout after 10 seconds")),
          10000
        );
      });

      const usersPromise = supabase
        .from("users")
        .select("id, email, first_name, last_name")
        .limit(5);

      const { data: usersData, error: usersError } = (await Promise.race([
        usersPromise,
        timeoutPromise,
      ])) as any;

      if (usersError) {
        setStatus(`Get users error: ${usersError.message}`);
      } else {
        setStatus(
          `✅ Get users success! Found ${usersData?.length || 0} users`
        );
        setUsers(usersData || []);
      }
    } catch (err) {
      setStatus(
        `Get users exception: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const testGetUsersWithRetry = async () => {
    setLoading(true);
    setStatus("Testing get users with retry logic...");

    try {
      const supabase = createClient();

      const result = await withRetry(
        async () => {
          const { data: usersData, error: usersError } = await supabase
            .from("users")
            .select("id, email, first_name, last_name")
            .limit(5);

          if (usersError) throw usersError;
          return usersData;
        },
        3,
        1000
      ); // 3 retries, 1 second delay

      setStatus(
        `✅ Get users with retry success! Found ${result?.length || 0} users`
      );
      setUsers(result || []);
    } catch (err) {
      setStatus(
        `❌ Get users with retry failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <AuthDebug />
      <h1>Supabase Connection Test</h1>

      {/* Diagnostic Info */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#d4edda",
          borderRadius: "4px",
          marginBottom: "20px",
          border: "1px solid #c3e6cb",
        }}
      >
        <h3>✅ DEADLOCK FIX APPLIED</h3>
        <p>
          <strong>Issue Fixed:</strong> Supabase onAuthStateChange deadlock
        </p>
        <p>
          <strong>Solution Applied:</strong> Wrapped all async operations in
          setTimeout(0)
        </p>
        <p>
          <strong>Status:</strong> Ready to test - buttons should work now!
        </p>
        <div style={{ marginTop: "10px" }}>
          <strong>Required:</strong>
          <br />• NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
          <br />• NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testEnvironment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Test Environment
        </button>

        <button
          onClick={testAuthOnly}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Testing..." : "Test Auth Only"}
        </button>

        <button
          onClick={testGetUsers}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#6f42c1",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Testing..." : "Test Get Users"}
        </button>

        <button
          onClick={testGetUsersWithRetry}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#e83e8c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Testing..." : "Test Get Users (Retry)"}
        </button>

        <button
          onClick={testConnection}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Testing..." : "Test Direct Connection"}
        </button>

        <button
          onClick={() => signIn("fodil135@gmail.com", "fodil135@gmail.com")}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          Test Sign In (fodil135@gmail.com)
        </button>

        <button
          onClick={() => signOut()}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Test Sign Out
        </button>
      </div>

      {/* Manual Test Form */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
          marginBottom: "20px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3>Manual Auth Test</h3>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          onClick={() => signIn(testEmail, testPassword)}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Test Custom Sign In
        </button>
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <strong>Direct Connection Status:</strong> {status}
      </div>

      {/* Hook Test Results */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#e8f5e8",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <h3>useSupabaseUsers Hook Test:</h3>
        <p>
          <strong>Status:</strong>{" "}
          {hookLoading
            ? "Loading..."
            : hookError
            ? `❌ Error: ${(hookError as Error)?.message || "Unknown error"}`
            : `✅ Success! Found ${hookUsers.length} users`}
        </p>
        {hookUsers.length > 0 && (
          <div>
            <p>
              <strong>Sample Users from Hook:</strong>
            </p>
            <ul>
              {hookUsers.slice(0, 3).map((user) => (
                <li key={user.id}>
                  {user.first_name} {user.last_name} ({user.email}) - Role:{" "}
                  {user.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {users.length > 0 && (
        <div>
          <h3>Sample Users (Direct Query):</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>
          <strong>Environment Check:</strong>
        </p>
        <ul>
          <li>
            NEXT_PUBLIC_SUPABASE_URL:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
          </li>
          <li>
            NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? "✅ Set"
              : "❌ Missing"}
          </li>
        </ul>
      </div>
    </div>
  );
}
