import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, 3);

  const features = [
    "Precision 3D printed with PLA+",
    "Post-processed for smooth operation",
    "Tested for 10,000+ cycles",
    "Ships in a protective case",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs tracking-widest uppercase mb-12"
        >
          <ArrowLeft size={12} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Area */}
          <div className="relative">
            <div
              className="relative h-96 lg:h-[500px] overflow-hidden border border-[#1a1a1a]"
              style={{ backgroundColor: product.color }}
            >
              <div className="absolute inset-0 diagonal-stripe" />
              <div className="absolute inset-0 grid-bg" />

              {/* Big decorative elements */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 rotate-45 float-anim"
                style={{ borderColor: product.accentColor, opacity: 0.3 }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border rotate-[67.5deg] float-anim"
                style={{ borderColor: product.accentColor, opacity: 0.5, animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full glow-pulse"
                style={{ backgroundColor: product.accentColor }}
              />

              {/* SKU label */}
              <div className="absolute bottom-6 left-6">
                <span
                  className="text-xs font-bold tracking-widest px-3 py-2 border"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: product.accentColor,
                    borderColor: `${product.accentColor}33`,
                  }}
                >
                  {product.sku}
                </span>
              </div>

              {/* Thumbnail row */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 border cursor-pointer hover:border-opacity-80 transition-colors"
                    style={{
                      backgroundColor: product.color,
                      borderColor: `${product.accentColor}44`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="w-4 h-4 rotate-45 border"
                        style={{ borderColor: product.accentColor, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[10px] font-bold tracking-widest px-2 py-1 border"
                style={{
                  color: product.accentColor,
                  borderColor: `${product.accentColor}44`,
                  backgroundColor: `${product.accentColor}10`,
                }}
              >
                {product.sku}
              </span>
              <span className="text-[#444] text-[10px] tracking-widest uppercase">
                {product.category}
              </span>
            </div>

            <h1 className="text-5xl font-black text-white tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-[#555] text-sm mb-6">{product.description}</p>

            <div className="accent-line w-16 mb-6" />

            <div className="text-5xl font-black mb-8" style={{ color: product.accentColor }}>
              ${product.price.toFixed(2)}
            </div>

            <p className="text-[#888] text-sm leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-xs text-[#666] tracking-wider">
                  <CheckCircle size={14} className="text-[#f97316] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase px-3 py-1 border"
                  style={{ borderColor: "#222", color: "#444" }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="accent-line w-8" />
            <h2 className="text-2xl font-black text-white tracking-tight">ALSO CONSIDER</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
