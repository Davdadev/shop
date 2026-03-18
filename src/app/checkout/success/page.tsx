import Link from "next/link";
import { CheckCircle, ArrowRight, Package } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] grid-bg flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Success icon */}
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center mx-auto" style={{ boxShadow: "0 0 40px rgba(34,197,94,0.2)" }}>
            <CheckCircle size={40} className="text-[#22c55e]" />
          </div>
          <div className="absolute -right-2 -top-2 w-6 h-6 bg-[#22c55e] rotate-45" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#22c55e]" />
          <span className="text-[#22c55e] text-xs tracking-[0.3em] uppercase">Order Confirmed</span>
          <div className="h-px w-8 bg-[#22c55e]" />
        </div>

        <h1 className="text-5xl font-black text-white mb-4">
          ORDER
          <br />
          <span className="text-[#22c55e]">CONFIRMED</span>
        </h1>

        <p className="text-[#555] text-sm leading-relaxed mb-4">
          Your fidget tools are queued for printing. We will send you a confirmation email with tracking information once your order ships.
        </p>

        <div className="bg-[#111] border border-[#1a1a1a] p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Package size={16} className="text-[#f97316]" />
            <span className="text-white font-bold text-xs tracking-wider uppercase">What Happens Next</span>
          </div>
          <ul className="space-y-3">
            {[
              "Your order is queued on our 3D printer",
              "Post-processing and quality check",
              "Packaged and shipped within 3 business days",
              "Tracking number sent to your email",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-[#555]">
                <span className="text-[#f97316] font-bold flex-shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            SHOP MORE <ArrowRight size={14} />
          </Link>
          <Link href="/" className="btn-secondary inline-flex items-center gap-2">
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
