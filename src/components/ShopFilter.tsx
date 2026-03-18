"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

export default function ShopFilter({ products }: { products: Product[] }) {
  // Build dynamic category list from actual products
  const presentCats = [...new Set(products.map((p) => p.category))];
  const categories = ["all", ...presentCats];

  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <div className="flex items-center gap-2 text-[#6b7280]">
          <SlidersHorizontal size={14} />
          <span className="text-xs tracking-widest uppercase">Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
              activeCategory === cat
                ? "border-[#008060] text-[#008060] bg-[#008060]/10"
                : "border-[#e2e8f0] text-[#6b7280] hover:border-[#cbd5e1] hover:text-[#64748b]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-[#94a3b8]">
          <div className="text-6xl mb-4">∅</div>
          <p className="text-xs tracking-widest uppercase">No products in this category</p>
        </div>
      )}
    </>
  );
}
