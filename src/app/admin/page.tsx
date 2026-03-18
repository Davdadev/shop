import { getAllProducts } from "@/lib/products";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { Package, PlusCircle, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = getAllProducts();
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.inStock).length;
  const outOfStock = totalProducts - inStock;
  const featured = products.filter((p) => p.featured).length;
  const avgPrice =
    totalProducts > 0
      ? products.reduce((s, p) => s + p.price, 0) / totalProducts
      : 0;

  const categories = [...new Set(products.map((p) => p.category))];

  const stats = [
    { label: "Total Products", value: totalProducts, icon: Package, accent: "#f97316" },
    { label: "In Stock", value: inStock, icon: CheckCircle, accent: "#22c55e" },
    { label: "Out of Stock", value: outOfStock, icon: XCircle, accent: "#ef4444" },
    { label: "Featured", value: featured, icon: TrendingUp, accent: "#22d3ee" },
  ];

  return (
    <AdminShell>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ color: "var(--text)" }}
          >
            Dashboard
          </h1>
          <div className="accent-line mt-2 w-16" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5"
              style={{
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--text-dim)" }}
                >
                  {stat.label}
                </span>
                <stat.icon size={16} style={{ color: stat.accent }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: stat.accent }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className="p-5"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "var(--text-dim)" }}
            >
              Average Price
            </p>
            <p className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
              ${avgPrice.toFixed(2)}
            </p>
          </div>
          <div
            className="p-5"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--text-dim)" }}
            >
              Categories ({categories.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    border: "1px solid rgba(249,115,22,0.2)",
                    color: "var(--accent)",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--text-dim)" }}
          >
            Quick Actions
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-2">
              <PlusCircle size={14} />
              Add Product
            </Link>
            <Link href="/admin/products" className="btn-secondary inline-flex items-center gap-2">
              <Package size={14} />
              Manage Products
            </Link>
          </div>
        </div>

        {/* Recent products */}
        <div>
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--text-dim)" }}
          >
            Recent Products
          </h2>
          <div
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
            }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["SKU", "Name", "Category", "Price", "Stock", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-dim)" }}>
                      {p.sku}
                    </td>
                    <td className="px-4 py-3 font-semibold tracking-wide" style={{ color: "var(--text)" }}>
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-xs uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                      {p.category}
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: "var(--accent)" }}>
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                        style={{
                          background: p.inStock ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                          border: `1px solid ${p.inStock ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                          color: p.inStock ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "var(--accent)" }}
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
