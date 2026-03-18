"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";

export default function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-[#e2e8f0]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-[#008060] rotate-45 transform group-hover:rotate-[225deg] transition-transform duration-500" />
            <div className="absolute inset-1 bg-white rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#008060] rounded-full" />
            </div>
          </div>
          <span className="text-[#1f2933] font-bold tracking-[0.15em] text-sm uppercase">
            FIDGET<span className="text-[#008060]">CRAFT</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#6b7280] hover:text-[#1f2933] transition-colors text-sm tracking-wider uppercase">
            Home
          </Link>
          <Link href="/shop" className="text-[#6b7280] hover:text-[#1f2933] transition-colors text-sm tracking-wider uppercase">
            Shop
          </Link>
          <Link href="/shop?category=spinners" className="text-[#6b7280] hover:text-[#1f2933] transition-colors text-sm tracking-wider uppercase">
            Spinners
          </Link>
          <Link href="/shop?category=cubes" className="text-[#6b7280] hover:text-[#1f2933] transition-colors text-sm tracking-wider uppercase">
            Cubes
          </Link>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative group">
            <ShoppingCart
              size={22}
              className="text-[#6b7280] group-hover:text-[#008060] transition-colors"
            />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#008060] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#6b7280] hover:text-[#1f2933] transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-[#6b7280] hover:text-[#1f2933] text-sm tracking-wider uppercase">Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-[#6b7280] hover:text-[#1f2933] text-sm tracking-wider uppercase">Shop</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-[#6b7280] hover:text-[#1f2933] text-sm tracking-wider uppercase">Cart</Link>
        </div>
      )}
    </nav>
  );
}
