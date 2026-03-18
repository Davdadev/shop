"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="YOUR@EMAIL.COM"
        className="flex-1 bg-white border border-[#e2e8f0] px-4 py-3 text-sm text-[#1f2933] placeholder-[#94a3b8] focus:outline-none focus:border-[#008060] tracking-wider"
      />
      <button type="submit" className="btn-primary" style={{ clipPath: "none" }}>
        SUBSCRIBE
      </button>
    </form>
  );
}
