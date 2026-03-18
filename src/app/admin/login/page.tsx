"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 mb-4"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.3)",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            <Lock size={22} style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="text-2xl font-bold tracking-widest uppercase" style={{ color: "var(--text)" }}>
            FIDGETCRAFT
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: "var(--text-dim)" }}>
            Admin Portal
          </p>
          <div className="accent-line mt-3 mx-auto w-24" />
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 text-sm pr-12 outline-none focus:ring-1"
                    style={{
                      background: "#0a0a0a",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.boxShadow = "0 0 0 1px var(--accent)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-dim)" }}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 p-3 mb-5 text-xs"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={14} className="shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="btn-primary w-full flex items-center justify-center gap-2"
                style={{
                  opacity: loading || !password ? 0.6 : 1,
                  cursor: loading || !password ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"
                    />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <Lock size={13} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--text-dim)" }}>
          Set <code style={{ color: "var(--accent)", fontFamily: "monospace" }}>ADMIN_PASSWORD_HASH</code> in your <code style={{ color: "var(--accent)", fontFamily: "monospace" }}>.env.local</code> to configure access.
        </p>
      </div>
    </div>
  );
}
