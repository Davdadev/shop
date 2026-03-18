"use client";

import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-[#555] text-xs tracking-widest uppercase">Qty:</span>
        <div className="flex items-center border border-[#222]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center text-[#555] hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-white font-bold border-x border-[#222]">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 flex items-center justify-center text-[#555] hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
          style={added ? { background: "#22c55e" } : {}}
        >
          <ShoppingCart size={14} />
          {added ? "ADDED TO CART!" : "ADD TO CART"}
        </button>
        {added && (
          <Link href="/cart" className="btn-secondary inline-flex items-center gap-2">
            VIEW CART
          </Link>
        )}
      </div>
    </div>
  );
}
