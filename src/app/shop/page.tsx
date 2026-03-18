"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

const categories = ["all", "spinners", "cubes", "wearables", "loops", "chains"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative pt-32 pb-16 border-b border-[#1a1a1a] overflow-hidden grid-bg">
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none">
          <span className="text-[12vw] font-black text-white" style={{ opacity: 0.02 }}>
            SHOP
          </span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line w-8" />
            <span className="text-[#f97316] text-xs tracking-[0.3em] uppercase">
              {filtered.length} products
            </span>
          </div>
          <h1 className="text-5xl font-black text-white">THE CATALOG</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
      </div>
    </div>
  );
}
