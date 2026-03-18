import { getProductById } from "@/lib/products";
import AdminShell from "@/components/AdminShell";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-dim)" }}
          >
            <ChevronLeft size={12} />
            Back to Products
          </Link>
          <h1
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ color: "var(--text)" }}
          >
            Edit — {product.name}
          </h1>
          <div className="accent-line mt-2 w-16" />
          <p className="text-sm mt-1 font-mono" style={{ color: "var(--text-dim)" }}>
            {product.sku}
          </p>
        </div>
        <ProductForm mode="edit" initialValues={product} productId={product.id} />
      </div>
    </AdminShell>
  );
}
