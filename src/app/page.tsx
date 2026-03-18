import Link from "next/link";
import { ArrowRight, Zap, Shield, Package, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.filter((p) => p.featured && p.inStock).slice(0, 3);
  // Fall back to first 3 in-stock products if no featured ones are set
  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : allProducts.filter((p) => p.inStock).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[20vw] font-black tracking-tighter text-white"
            style={{ opacity: 0.015 }}
          >
            FIDGET
          </span>
        </div>

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#f97316] rotate-45"
            style={{ opacity: 0.04 }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-32 h-32 border border-[#f97316] rotate-[22.5deg]"
            style={{ opacity: 0.07 }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-[#f97316] rotate-12"
            style={{ opacity: 0.04 }}
          />
        </div>

        {/* 3D Spinner showcase */}
        <div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ perspective: "600px" }}
        >
          <div className="spinner-3d relative w-40 h-40">
            {/* Cube faces */}
            <div className="absolute inset-0 border-2 border-[#f97316] bg-[#f97316]/5" style={{ transform: "translateZ(70px)" }} />
            <div className="absolute inset-0 border-2 border-[#f97316] bg-[#f97316]/5" style={{ transform: "translateZ(-70px)" }} />
            <div className="absolute inset-0 border-2 border-[#f97316]/50 bg-[#f97316]/3" style={{ transform: "rotateY(90deg) translateZ(70px)" }} />
            <div className="absolute inset-0 border-2 border-[#f97316]/50 bg-[#f97316]/3" style={{ transform: "rotateY(-90deg) translateZ(70px)" }} />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#f97316] rounded-full glow-pulse" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="accent-line w-12" />
              <span className="text-[#f97316] text-xs tracking-[0.3em] uppercase font-bold">
                3D Printed · Precision Engineered
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8">
              FOCUS
              <br />
              <span className="text-[#f97316]">THROUGH</span>
              <br />
              YOUR
              <br />
              HANDS
            </h1>

            <p className="text-[#888] text-lg max-w-md leading-relaxed mb-10">
              Every piece precision engineered on a real 3D printer. 
              Not mass produced. Not generic. Built for makers, by a maker.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                SHOP NOW <ArrowRight size={14} />
              </Link>
              <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
                VIEW CATALOG
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-16 pt-8 border-t border-[#1a1a1a]">
              {[
                { num: "6", label: "Products" },
                { num: "100%", label: "3D Printed" },
                { num: "∞", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-[#f97316]">{stat.num}</div>
                  <div className="text-[#444] text-xs tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="accent-line w-8" />
              <span className="text-[#f97316] text-xs tracking-[0.3em] uppercase">Featured</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              TOP PICKS
            </h2>
          </div>
          <Link href="/shop" className="text-[#f97316] text-sm tracking-wider uppercase hover:text-white transition-colors flex items-center gap-2">
            All Products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#f97316]" />
              <span className="text-[#f97316] text-xs tracking-[0.3em] uppercase">Why Fidgetcraft</span>
              <div className="h-px w-8 bg-[#f97316]" />
            </div>
            <h2 className="text-4xl font-black text-white">THE MAKER DIFFERENCE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap size={24} />,
                title: "Real 3D Printing",
                desc: "Not outsourced. Not molded. Every piece comes off a real FDM printer with premium PLA+.",
              },
              {
                icon: <Shield size={24} />,
                title: "Precision Tolerances",
                desc: "0.1mm layer height. Post-processed for smooth action. Tested for 10,000+ cycles.",
              },
              {
                icon: <Package size={24} />,
                title: "Ships in 3 Days",
                desc: "Made to order. Your fidget is printed fresh, not sitting in a warehouse.",
              },
              {
                icon: <Star size={24} />,
                title: "Lifetime Support",
                desc: "Something breaks? We reprint it. That is the maker guarantee.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-[#111] border border-[#1a1a1a] p-6 group hover:border-[#f97316]/30 transition-colors"
              >
                {/* Number */}
                <div
                  className="absolute top-4 right-4 text-5xl font-black text-white"
                  style={{ opacity: 0.03 }}
                >
                  0{i + 1}
                </div>
                <div className="text-[#f97316] mb-4">{item.icon}</div>
                <h3 className="text-white font-bold tracking-wider text-sm uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-[#555] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-[#111] border border-[#1a1a1a] p-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div
            className="absolute -right-20 -top-20 w-80 h-80 border border-[#f97316] rotate-45"
            style={{ opacity: 0.05 }}
          />

          <div className="relative z-10 max-w-xl">
            <span className="text-[#f97316] text-xs tracking-[0.3em] uppercase font-bold">
              Stay in the loop
            </span>
            <h2 className="text-3xl font-black text-white mt-2 mb-4">
              NEW PRINTS EVERY MONTH
            </h2>
            <p className="text-[#555] text-sm mb-8">
              Get early access to new designs, limited runs, and exclusive maker discounts.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
