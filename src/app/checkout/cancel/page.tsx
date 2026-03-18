import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] grid-bg flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Cancel icon */}
        <div className="relative inline-block mb-8">
          <div
            className="w-24 h-24 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-center justify-center mx-auto"
            style={{ boxShadow: "0 0 40px rgba(239,68,68,0.15)" }}
          >
            <XCircle size={40} className="text-[#ef4444]" />
          </div>
          <div className="absolute -right-2 -top-2 w-6 h-6 bg-[#ef4444] rotate-45" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#ef4444]" />
          <span className="text-[#ef4444] text-xs tracking-[0.3em] uppercase">Checkout Cancelled</span>
          <div className="h-px w-8 bg-[#ef4444]" />
        </div>

        <h1 className="text-5xl font-black text-[#1f2933] mb-4">
          CHECKOUT
          <br />
          <span className="text-[#ef4444]">CANCELLED</span>
        </h1>

        <p className="text-[#6b7280] text-sm leading-relaxed mb-10">
          No worries — your cart is still saved. Head back when you&apos;re ready to complete your order.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/cart" className="btn-primary inline-flex items-center gap-2">
            <ShoppingCart size={14} /> RETURN TO CART
          </Link>
          <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={14} /> KEEP SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}
