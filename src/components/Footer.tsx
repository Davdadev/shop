import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f6f7fb] border-t border-[#e2e8f0] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-[#008060] rotate-45 transform" />
            <span className="text-[#1f2933] font-bold tracking-[0.15em] text-sm uppercase">
              FIDGET<span className="text-[#008060]">CRAFT</span>
            </span>
          </div>
          <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs">
            Precision 3D printed fidget tools. Every piece engineered for maximum satisfaction. Built in a real workshop, shipped to makers worldwide.
          </p>
          <div className="accent-line w-24 mt-6" />
        </div>

          {/* Shop */}
          <div>
          <h4 className="text-[#1f2933] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Shop
          </h4>
          <ul className="space-y-3">
            {["All Products", "Spinners", "Cubes", "Wearables", "Chains"].map((item) => (
              <li key={item}>
                <Link
                  href="/shop"
                  className="text-[#6b7280] hover:text-[#008060] text-sm transition-colors"
                >
                  {item}
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
          <h4 className="text-[#1f2933] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Info
          </h4>
          <ul className="space-y-3">
            {[
              { label: "About", href: "/" },
              { label: "Shipping", href: "/" },
                { label: "Returns", href: "/" },
                { label: "Contact", href: "/" },
              ].map((item) => (
                <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[#6b7280] hover:text-[#008060] text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>

        <div className="border-t border-[#e2e8f0] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94a3b8] text-xs tracking-wider">
            © {new Date().getFullYear()} FIDGETCRAFT. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[#94a3b8] text-xs tracking-wider">
            MADE WITH PRECISION · SHIPPED WITH CARE
          </p>
        </div>
      </div>
    </footer>
  );
}
