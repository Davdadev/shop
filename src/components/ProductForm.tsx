"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ProductFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<Product>;
  productId?: string;
}

const CATEGORIES = ["cubes", "spinners", "wearables", "loops", "chains", "rings", "sliders", "other"];

const ACCENT_COLORS = [
  { label: "Orange", value: "#f97316" },
  { label: "Cyan", value: "#22d3ee" },
  { label: "Green", value: "#22c55e" },
  { label: "Red", value: "#ef4444" },
  { label: "Yellow", value: "#eab308" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "White", value: "#f0f0f0" },
];

const BG_COLORS = [
  { label: "Dark Blue", value: "#1a1a2e" },
  { label: "Navy", value: "#0d1b2a" },
  { label: "Dark Red", value: "#1a0a0a" },
  { label: "Dark Green", value: "#0a1a0a" },
  { label: "Dark Gold", value: "#1a1500" },
  { label: "Dark Purple", value: "#0a0a1a" },
  { label: "Charcoal", value: "#111111" },
];

type FormState = {
  name: string;
  sku: string;
  price: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string;
  color: string;
  accentColor: string;
  inStock: boolean;
  featured: boolean;
};

function buildFormState(initial?: Partial<Product>): FormState {
  return {
    name: initial?.name ?? "",
    sku: initial?.sku ?? "",
    price: initial?.price?.toString() ?? "",
    description: initial?.description ?? "",
    longDescription: initial?.longDescription ?? "",
    category: initial?.category ?? "other",
    tags: initial?.tags?.join(", ") ?? "",
    color: initial?.color ?? "#111111",
    accentColor: initial?.accentColor ?? "#f97316",
    inStock: initial?.inStock ?? true,
    featured: initial?.featured ?? false,
  };
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-bold tracking-widest uppercase mb-1.5"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
        {required && <span style={{ color: "var(--accent)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "#0a0a0a",
  border: "1px solid var(--border)",
  color: "var(--text)",
  fontFamily: "inherit",
};

export default function ProductForm({ mode, initialValues, productId }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(buildFormState(initialValues));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      setError("Price must be a positive number");
      setLoading(false);
      return;
    }

    const payload: Partial<Product> = {
      name: form.name.trim().toUpperCase(),
      sku: form.sku.trim().toUpperCase(),
      price,
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      color: form.color,
      accentColor: form.accentColor,
      inStock: form.inStock,
      featured: form.featured,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${productId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        setSuccess(true);
        if (mode === "create") {
          router.push("/admin/products");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-2xl">
      {/* Preview swatch */}
      <div
        className="h-20 flex items-center px-6 gap-4 relative overflow-hidden"
        style={{
          background: form.color,
          border: `2px solid ${form.accentColor}`,
        }}
      >
        <div
          className="w-10 h-10 rotate-45"
          style={{ background: form.accentColor, opacity: 0.25 }}
        />
        <div>
          <p className="font-bold tracking-widest uppercase text-lg" style={{ color: form.accentColor }}>
            {form.name || "PRODUCT NAME"}
          </p>
          <p className="text-xs font-mono" style={{ color: form.accentColor, opacity: 0.7 }}>
            {form.sku || "FC-000"} · ${form.price || "0.00"}
          </p>
        </div>
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest"
          style={{ color: form.accentColor, opacity: 0.5 }}
        >
          Preview
        </span>
      </div>

      {/* Basic info */}
      <div
        className="p-6 space-y-4"
        style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-2"
          style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}
        >
          Basic Info
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Product Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              placeholder="e.g. VORTEX SPINNER"
              className="w-full px-3 py-2.5 text-sm outline-none"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </Field>

          <Field label="SKU" required>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => set("sku", e.target.value)}
              required
              placeholder="e.g. FC-007"
              className="w-full px-3 py-2.5 text-sm font-mono outline-none"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (USD)" required>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold"
                style={{ color: "var(--text-dim)" }}
              >
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2.5 text-sm outline-none"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          </Field>

          <Field label="Category" required>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2.5 text-sm outline-none appearance-none cursor-pointer"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Short Description" required>
          <input
            type="text"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
            maxLength={100}
            placeholder="One-line summary shown on cards"
            className="w-full px-3 py-2.5 text-sm outline-none"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </Field>

        <Field label="Full Description" required>
          <textarea
            value={form.longDescription}
            onChange={(e) => set("longDescription", e.target.value)}
            required
            rows={4}
            placeholder="Detailed product description shown on the product page…"
            className="w-full px-3 py-2.5 text-sm outline-none resize-y"
            style={{ ...inputStyle, minHeight: "100px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </Field>

        <Field label="Tags (comma-separated)">
          <input
            type="text"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="e.g. spinner, bearing, premium"
            className="w-full px-3 py-2.5 text-sm outline-none"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </Field>
      </div>

      {/* Appearance */}
      <div
        className="p-6 space-y-4"
        style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-2"
          style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}
        >
          Card Appearance
        </h3>

        <Field label="Background Color">
          <div className="flex flex-wrap gap-2 mt-1">
            {BG_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => set("color", c.value)}
                className="w-8 h-8 transition-all"
                style={{
                  background: c.value,
                  border: form.color === c.value ? "2px solid var(--accent)" : "2px solid transparent",
                  outline: form.color === c.value ? "2px solid var(--accent)" : "none",
                  outlineOffset: "2px",
                }}
                title={c.label}
              />
            ))}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-dim)" }}>Custom:</span>
              <input
                type="color"
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
                className="w-8 h-8 cursor-pointer"
                style={{ background: "transparent", border: "1px solid var(--border)" }}
              />
            </div>
          </div>
        </Field>

        <Field label="Accent Color">
          <div className="flex flex-wrap gap-2 mt-1">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => set("accentColor", c.value)}
                className="w-8 h-8 transition-all"
                style={{
                  background: c.value,
                  border: form.accentColor === c.value ? "2px solid #fff" : "2px solid transparent",
                  outline: form.accentColor === c.value ? "2px solid var(--accent)" : "none",
                  outlineOffset: "2px",
                }}
                title={c.label}
              />
            ))}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-dim)" }}>Custom:</span>
              <input
                type="color"
                value={form.accentColor}
                onChange={(e) => set("accentColor", e.target.value)}
                className="w-8 h-8 cursor-pointer"
                style={{ background: "transparent", border: "1px solid var(--border)" }}
              />
            </div>
          </div>
        </Field>
      </div>

      {/* Status */}
      <div
        className="p-6 space-y-3"
        style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-2"
          style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}
        >
          Status
        </h3>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => set("inStock", e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>In Stock</p>
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              Uncheck to show as sold out on the storefront
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Featured Product</p>
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              Featured products appear on the homepage
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 p-3 text-xs"
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

      {success && (
        <div
          className="flex items-center gap-2 p-3 text-xs"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#22c55e",
          }}
        >
          <CheckCircle2 size={14} className="shrink-0" />
          Product {mode === "create" ? "created" : "updated"} successfully!
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary inline-flex items-center gap-2"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : mode === "create" ? (
            "Create Product"
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
