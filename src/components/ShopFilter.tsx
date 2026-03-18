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
        <div className="flex items-center gap-2 text-[#555]">
          <SlidersHorizontal size={14} />
          <span className="text-xs tracking-widest uppercase">Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
              activeCategory === cat
                ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10"
                : "border-[#222] text-[#555] hover:border-[#333] hover:text-[#888]"
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
        <div className="text-center py-24 text-[#333]">
          <div className="text-6xl mb-4">∅</div>
          <p className="text-xs tracking-widest uppercase">No products in this category</p>
        </div>
      )}
    </>
  );
}
