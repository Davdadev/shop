import { getAllProducts } from "@/lib/products";
import ShopFilter from "@/components/ShopFilter";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  const products = getAllProducts().filter((p) => p.inStock);

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* Header */}
      <div className="relative pt-32 pb-16 border-b border-[#e2e8f0] overflow-hidden grid-bg">
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none">
          <span className="text-[12vw] font-black text-[#1f2933]" style={{ opacity: 0.05 }}>
            SHOP
          </span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line w-8" />
            <span className="text-[#008060] text-xs tracking-[0.3em] uppercase">
              {products.length} products
            </span>
          </div>
          <h1 className="text-5xl font-black text-[#1f2933]">THE CATALOG</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <ShopFilter products={products} />
      </div>
    </div>
  );
}
