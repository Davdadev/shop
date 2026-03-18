import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-[#f97316] rotate-45 transform" />
              <span className="text-white font-bold tracking-[0.15em] text-sm uppercase">
                FIDGET<span className="text-[#f97316]">CRAFT</span>
              </span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs">
              Precision 3D printed fidget tools. Every piece engineered for maximum satisfaction. Built in a real workshop, shipped to makers worldwide.
            </p>
            <div className="accent-line w-24 mt-6" />
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {["All Products", "Spinners", "Cubes", "Wearables", "Chains"].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-[#555] hover:text-[#f97316] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
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
                    className="text-[#555] hover:text-[#f97316] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#333] text-xs tracking-wider">
            © {new Date().getFullYear()} FIDGETCRAFT. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[#333] text-xs tracking-wider">
            MADE WITH PRECISION · SHIPPED WITH CARE
          </p>
        </div>
      </div>
    </footer>
  );
}
