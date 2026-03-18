"use client";

import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/lib/store";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-6 border-b border-[#1a1a1a] group">
      {/* Color swatch / image placeholder */}
      <div
        className="w-20 h-20 flex-shrink-0 relative overflow-hidden"
        style={{ backgroundColor: item.product.color }}
      >
        <div className="absolute inset-0 diagonal-stripe" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border"
          style={{ borderColor: item.product.accentColor, opacity: 0.6 }}
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#555] text-[10px] tracking-widest uppercase mb-1">
              {item.product.sku}
            </p>
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">
              {item.product.name}
            </h3>
            <p className="text-[#555] text-xs mt-1">{item.product.description}</p>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-[#333] hover:text-[#f97316] transition-colors ml-4"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity controls */}
          <div className="flex items-center border border-[#222]">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center text-white text-sm font-bold border-x border-[#222]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Subtotal */}
          <span className="text-[#f97316] font-black text-lg">
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
