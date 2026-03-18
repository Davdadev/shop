"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="product-card bg-white border border-[#e2e8f0] overflow-hidden cursor-pointer group">
        {/* Image placeholder */}
        <div
          className="relative h-52 overflow-hidden"
          style={{ backgroundColor: product.color }}
        >
          {/* Diagonal stripe overlay */}
          <div className="absolute inset-0 diagonal-stripe" />

          {/* Big SKU in background */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: product.accentColor, opacity: 0.08 }}
          >
            <span className="text-7xl font-black tracking-tight">{product.sku}</span>
          </div>

          {/* Geometric shape */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rotate-45 border-2 float-anim"
            style={{ borderColor: product.accentColor, opacity: 0.4 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-[22.5deg] border"
            style={{ borderColor: product.accentColor, opacity: 0.6 }}
          />

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ backgroundColor: product.accentColor }}
          />

          {/* SKU label */}
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                color: product.accentColor,
                border: `1px solid ${product.accentColor}33`,
              }}
            >
              {product.sku}
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${product.accentColor}10` }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[#1f2933] font-bold tracking-wider text-sm uppercase">
              {product.name}
            </h3>
            <span
              className="text-lg font-black"
              style={{ color: product.accentColor }}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-[#6b7280] text-xs leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-widest uppercase px-2 py-0.5 border"
                style={{ borderColor: "#e2e8f0", color: "#94a3b8" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAdd}
            className="w-full btn-primary flex items-center justify-center gap-2 text-xs"
            style={added ? { background: "#22c55e" } : {}}
          >
            <ShoppingCart size={12} />
            {added ? "ADDED!" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </Link>
  );
}
