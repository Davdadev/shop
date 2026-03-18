"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { Product } from "@/types";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  AlertCircle,
  Search,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleStock(product: Product) {
    setTogglingId(product.id);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: !product.inStock }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProducts((p) => p.map((x) => (x.id === product.id ? updated : x)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Update failed");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleToggleFeatured(product: Product) {
    setTogglingId(product.id);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !product.featured }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProducts((p) => p.map((x) => (x.id === product.id ? updated : x)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Update failed");
    } finally {
      setTogglingId(null);
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1
              className="text-2xl font-bold tracking-widest uppercase"
              style={{ color: "var(--text)" }}
            >
              Products
            </h1>
            <div className="accent-line mt-2 w-16" />
          </div>
          <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-2">
            <PlusCircle size={14} />
            Add Product
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative mb-6 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-dim)" }}
          />
          <input
            type="text"
            placeholder="Search by name, SKU, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm outline-none"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          />
        </div>

        {error && (
          <div
            className="flex items-center gap-2 p-3 mb-6 text-xs"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
            }}
          >
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span
              className="inline-block w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
            />
          </div>
        ) : (
          <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm" style={{ color: "var(--text-dim)" }}>
                  {search ? "No products match your search." : "No products yet."}
                </p>
                {!search && (
                  <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-1 text-xs mt-3 font-bold uppercase tracking-widest"
                    style={{ color: "var(--accent)" }}
                  >
                    <PlusCircle size={12} />
                    Add your first product
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      {["", "SKU", "Name", "Category", "Price", "Stock", "Featured", ""].map((h, i) => (
                        <th
                          key={i}
                          className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase"
                          style={{ color: "var(--text-dim)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr
                        key={p.id}
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        {/* Color swatch */}
                        <td className="px-4 py-3">
                          <div
                            className="w-7 h-7 rounded-sm"
                            style={{
                              background: p.color,
                              border: `2px solid ${p.accentColor}`,
                            }}
                          />
                        </td>

                        <td
                          className="px-4 py-3 font-mono text-xs"
                          style={{ color: "var(--text-dim)" }}
                        >
                          {p.sku}
                        </td>

                        <td
                          className="px-4 py-3 font-semibold tracking-wide"
                          style={{ color: "var(--text)" }}
                        >
                          {p.name}
                        </td>

                        <td
                          className="px-4 py-3 text-xs uppercase tracking-widest"
                          style={{ color: "var(--text-dim)" }}
                        >
                          {p.category}
                        </td>

                        <td
                          className="px-4 py-3 font-bold"
                          style={{ color: "var(--accent)" }}
                        >
                          ${p.price.toFixed(2)}
                        </td>

                        {/* Stock toggle */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleStock(p)}
                            disabled={togglingId === p.id}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity"
                            style={{
                              color: p.inStock ? "#22c55e" : "#ef4444",
                              opacity: togglingId === p.id ? 0.5 : 1,
                            }}
                            title="Toggle stock status"
                          >
                            {p.inStock ? (
                              <ToggleRight size={18} />
                            ) : (
                              <ToggleLeft size={18} />
                            )}
                            {p.inStock ? "In Stock" : "Out"}
                          </button>
                        </td>

                        {/* Featured toggle */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            disabled={togglingId === p.id}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity"
                            style={{
                              color: p.featured ? "#eab308" : "var(--text-dim)",
                              opacity: togglingId === p.id ? 0.5 : 1,
                            }}
                            title="Toggle featured"
                          >
                            <Star
                              size={15}
                              fill={p.featured ? "currentColor" : "none"}
                            />
                            {p.featured ? "Featured" : "—"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/products/${p.id}/edit`}
                              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                              style={{ color: "var(--accent)" }}
                            >
                              <Pencil size={12} />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              disabled={deletingId === p.id}
                              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-opacity"
                              style={{
                                color: "#ef4444",
                                opacity: deletingId === p.id ? 0.5 : 1,
                              }}
                            >
                              <Trash2 size={12} />
                              {deletingId === p.id ? "…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <p className="text-xs mt-4" style={{ color: "var(--text-dim)" }}>
          {filtered.length} of {products.length} products
        </p>
      </div>
    </AdminShell>
  );
}
