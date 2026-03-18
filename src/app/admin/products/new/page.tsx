import AdminShell from "@/components/AdminShell";
import ProductForm from "@/components/ProductForm";

export default function AddProductPage() {
  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ color: "var(--text)" }}
          >
            Add Product
          </h1>
          <div className="accent-line mt-2 w-16" />
          <p className="text-sm mt-2" style={{ color: "var(--text-dim)" }}>
            Create a new product listing in your store.
          </p>
        </div>
        <ProductForm mode="create" />
      </div>
    </AdminShell>
  );
}
