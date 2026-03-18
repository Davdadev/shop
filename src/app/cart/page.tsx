"use client";

import { useCartStore } from "@/lib/store";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, total, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Checkout failed");
      }

      const { url } = await res.json();

      if (url) {
        window.location.href = url;
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 text-[#e2e8f0]">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h1 className="text-3xl font-black text-[#1f2933] mb-2">CART IS EMPTY</h1>
          <p className="text-[#6b7280] text-sm mb-8">Nothing here yet. Go find something satisfying.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            BROWSE SHOP <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total();
  const shipping = 4.99;
  const orderTotal = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/shop"
            className="text-[#6b7280] hover:text-[#1f2933] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="accent-line w-8" />
              <span className="text-[#008060] text-xs tracking-[0.3em] uppercase">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="text-4xl font-black text-[#1f2933]">YOUR CART</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <button
              onClick={clearCart}
              className="mt-6 text-[#94a3b8] hover:text-[#008060] text-xs tracking-widest uppercase transition-colors"
            >
              CLEAR CART
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-[#e2e8f0] p-8 sticky top-28">
              <h2 className="text-[#1f2933] font-bold tracking-wider text-sm uppercase mb-6 pb-4 border-b border-[#e2e8f0]">
                ORDER SUMMARY
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="text-[#1f2933]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className="text-[#1f2933]">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#e2e8f0] pt-3 flex justify-between">
                  <span className="text-[#1f2933] font-bold text-sm tracking-wider uppercase">Total</span>
                  <span className="text-[#008060] font-black text-xl">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs mb-4 p-3 bg-red-500/10 border border-red-500/20">
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  "PROCESSING..."
                ) : (
                  <>
                    CHECKOUT <ArrowRight size={14} />
                  </>
                )}
              </button>

              <p className="text-[#94a3b8] text-[10px] tracking-wider text-center mt-4">
                SECURED BY STRIPE · SSL ENCRYPTED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
